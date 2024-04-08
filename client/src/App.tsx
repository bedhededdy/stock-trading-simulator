import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import UserContext from "@contexts/UserContext";

import UserView from "@views/UserView";

import Login from "@components/Login";
import Dashboard from "@components/Dashboard";
import Navbar from "@components/Navbar";


const App: React.FC = () => {
  const [user, setUser] = useState<UserView>(new UserView());

  const navigate = useNavigate();

  useEffect(() => {
    // TODO: CHECK FOR AN EXISTING SESSION ON THE SERVER
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
