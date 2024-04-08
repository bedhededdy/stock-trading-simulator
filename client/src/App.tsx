import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import UserContext from "@contexts/UserContext";

import UserView from "@views/UserView";

import Login from "@components/Login";
import Dashboard from "@components/Dashboard";
import Navbar from "@components/Navbar";


const App: React.FC = () => {
  const [user, setUser] = useState<UserView | null>(null);

  // const navigate = useNavigate();

  useEffect(() => {
    // TODO: CHECK FOR AN EXISTING SESSION ON THE SERVER
    //       IF THERE IS ONE, GET THE USER DATA AND SET IT
    //       THEN NAVIGATE TO THE DASHBOARD, BUT CAN'T DO IT
    //       USING USE NAVIGATE BECAUSE YOU CAN'T USE IT
    //       OUTSIDE A ROUTER CONTEXT
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  )
}

export default App;
