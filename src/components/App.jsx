import React from "react";
import "./App.css";
import { apiAll } from "../api/api";
import Dashboard from "./layout/Dashboard/Dashboard";

const App = () => {
  apiAll();

  return <Dashboard />;
};

export default App;
