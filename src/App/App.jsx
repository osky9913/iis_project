import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard/Dashboard";
import UserContext from "../context/UserContext";
import { userService } from "../services";
import CustomAppBar from "./components/layout/AppBar/CustomAppBar";

const App = () => {
  const [user, setUser] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkedLogged = async () => {
      let token = localStorage.getItem("token");
      if (token === null) {
        token = "";
        localStorage.setItem("token", "");
        localStorage.setItem("user", "");
      } else {
        // set user here

        userService.isValid(token).then((response) => {
          if (response.status === 200) {
            const user = JSON.parse(localStorage.getItem("user"));
            setUser({ token: token, user: user });
          }
        });
        // is valid
      }
    };
    checkedLogged();
  }, []);

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/register">
              <div>"hello world register"</div>
            </Route>
            <Route exact path="/settings">
              <div>
                <CustomAppBar />
                <p> "Setting you mother fucker"</p>
              </div>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
};

export default App;
