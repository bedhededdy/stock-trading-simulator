import cors from "cors";
import express from "express";
import fs from "fs";
import { MongoClient } from "mongodb";
import yahooFinance from "yahoo-finance2";

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const MONGO_DB = process.env.MONGO_DB || "stock-tracker";
const PORT = process.env.PORT || 8000;

const client = new MongoClient(MONGO_URL);
(async () => {
  await client.connect();
})();
const db = client.db(MONGO_DB);

const tickers = JSON.parse(fs.readFileSync("symbols.json", "utf-8").toString());

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/signup", async (req, res) => {
  // FIXME: ERROR HANDLING
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ msg: "Bad request" });
    return;
  }

  const users = db.collection("users");
  const existingUsers = await users.find({ name: req.body.username }).toArray();
  if (existingUsers.length > 0) {
    res.status(400).json({ msg: "User already exists" });
    return;
  }
  await users.insertOne({ name: req.body.username, password: req.body.password })
  res.json({name: req.body.username, accounts: []});
});

app.get("/api/login", (req, res) => {
  if (!req.query.username || !req.query.password) {
    res.status(400).json({ msg: "Bad request" });
    return;
  }

  const users = db.collection("users");
  users.findOne({ name: req.query.username, password: req.query.password }).then(user => {
    if (!user) {
      res.status(400).json({ msg: "User not found" });
      return;
    }
    res.json({name: user.name, accounts: user.accounts});
  });
});

app.post("/api/addAccount", (req, res) => {
  // TODO: APPEND ACCOUNT TO THE USER'S EXISTING ACCOUNT
  //       AND MAKE SURE THAT THE ACCOUNT NAME IS UNIQUE
  //       FOR THE USER
  //       ADDITIONALLY WE MUST ADD AN ACCOUNT OBJECT WITH THE NEW CASH BALANCE
  //       TO THE ACCOUNTS ARRAY
  //       THE QUERY WILL HAVE A USERNAME AND A BALANCE
  if (!req.body.username || !req.body.accountName || !req.body.balance) {
    res.status(400).json({ msg: "Bad request" });
    return;
  }

  const users = db.collection("users");
  // FIXME: THIS SHOULD BE STRONGLY TYPED
  const account: any = {name: req.body.accountName, balance: req.body.balance};

  // FIXME: MAKE SURE NO ACCOUTN WITH THE SAME NAME EXISTS
  users.updateOne({ name: req.body.username }, { $push: {accounts: account}}).then(result => {
    if (result.modifiedCount === 0) {
      res.status(400).json({ msg: "User not found" });
      return;
    }
    res.json({msg: "Account added"});
  });
});

app.get("/api/getAccounts", (req, res) => {
  if (!req.query.username) {
    res.status(400).json({ msg: "Bad request" });
    return;
  }

  const users = db.collection("users");
  users.findOne({ name: req.query.username }).then(user => {
    if (!user) {
      res.status(400).json({ msg: "User not found" });
      return;
    }
    res.json({accounts: user.accounts});
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port 8000");
});
