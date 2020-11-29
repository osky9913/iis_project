import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContext from "../context/UserContext";
import { userService } from "../services";
import CustomAppBar from "./components/layout/AppBar/CustomAppBar";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { createBrowserHistory } from "history";
import Box from "@material-ui/core/Box";
import AppBar from "./components/layout/AppBar/CustomAppBar";
import { FestivalDashboard } from "./components/pages/FestivalDashboard/FestivalDashboard";
import Festival from "./components/pages/FestivalPage/Festival";
import Interpret from "./components/pages/InterpretDashboard/InterpretPage/Interpret";
import {InterpretDashboard} from "./components/pages/InterpretDashboard/InterpretDashboard";
import Stage from "./components/pages/StagePage/Stage";
import HomePage from "./components/pages/HomePage/HomePage";
import UserReservationPage from "./components/pages/UserReservationPage/UserReservationPage";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const App = () => {
  const classes = useStyles();
  const history = createBrowserHistory();

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
        <Router history={history}>
          <Box>
            <AppBar />

            <Switch>
              <Route exact path="/">
                <HomePage/>
              </Route>

              <Route exact path="/festivals">
                <FestivalDashboard />
              </Route>
              <Route
                exact
                path={"/festival-:festivalId"}
                children={<Festival />}
              />

              <Route exact path="/interprets">
                <InterpretDashboard />
              </Route>

              <Route
                  exact
                  path={"/interpret-:interpretId"}
                  children={<Interpret />}
              />

              <Route
                  exact
                  path={"/stage-:someId/:stageId"}
                  children={<Stage />}
              />

              <Route exact path="/reservations">
                <UserReservationPage />
              </Route>

              <Route exact path="/register">
                <div>"hello world register"</div>
              </Route>
              <Route exact path="/settings">
                <div>
                  <CustomAppBar />
                  <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div style={{ padding: "20px" }}>
                      <Container maxWidth="lg">
                        <p> "Setting you mother fucker"</p>
                      </Container>
                    </div>
                  </main>
                </div>
              </Route>
            </Switch>
          </Box>
        </Router>
      </UserContext.Provider>
    </div>
  );
};

export default App;
