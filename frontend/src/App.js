import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App = () => {
  const code = new URLSearchParams(window.location.search).get("code");

  return (
    <Router>
      <div>{code ? <Dashboard code={code} /> : <Login />}</div>
    </Router>
  );
};

export default App;
