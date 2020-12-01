import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContext from "../context/UserContext";
import { userService } from "../services";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { createBrowserHistory } from "history";
import Box from "@material-ui/core/Box";
import AppBar from "./components/layout/AppBar/CustomAppBar";
import { FestivalDashboard } from "./components/pages/FestivalDashboard/FestivalDashboard";
import Festival from "./components/pages/FestivalPage/Festival";
import Interpret from "./components/pages/InterpretDashboard/InterpretPage/Interpret";
import { InterpretDashboard } from "./components/pages/InterpretDashboard/InterpretDashboard";
import Stage from "./components/pages/StagePage/Stage";
import HomePage from "./components/pages/HomePage/HomePage";
import UserReservationPage from "./components/pages/UserReservationPage/UserReservationPage";
import SettingsPage from "./components/pages/SettingsPage/SettingsPage";
import AdminEditPage from "./components/pages/AdminEditPage/AdminEditPage";
import AdminReservationPage from "./components/pages/AdminReservationPage/AdminReservationPage";
import RegistrationPage from "./components/pages/RegistrationPage/RegistrationPage";
import UsersSettings from "./components/layout/AppBar/DrawerMenu/UsersSettings/UsersSettings";
import AddNewFestivalPage from "./components/pages/AddNewFestivalPage/AddNewFestivalPage";
import AddNewInterpretPage from "./components/pages/AddNewInterpretPage/AddNewInterpretPage";
import EditInterpretListInFestival from "./components/pages/EditInterpretListInFestival/EditIntepretListInFestival";
import EditStageFestivalPage from "./components/pages/EditStageFestivalPage/EditStageFestivalPage";
import EditStagePerformanceList from "./components/pages/EditStagePerformanceList/EditStagePerformanceList";
import ReservationOfUnregisteredPage from "./components/pages/ReservationOfUnregisteredPage/ReservationOfUnregisteredPage";
import RegistrationUnregistered from "./components/pages/ReservationOfUnregisteredPage/RegistrationUnregistered";

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
                <HomePage />
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

              <Route
                exact
                path={"/admin-edit-:id"}
                children={<AdminEditPage />}
              />

              <Route exact path="/user-reservation">
                <UserReservationPage />
              </Route>

              <Route exact path="/new-registration">
                <RegistrationPage />
              </Route>

              <Route
                exact
                path="/edit-interpret-list-:festivalId"
                children={<EditInterpretListInFestival />}
              />

              <Route exact path="/admin-reservation">
                <AdminReservationPage />
              </Route>

              <Route exact path={"/admin-settings"}>
                <UsersSettings />
              </Route>

              <Route exact path={"/add-new-festival"}>
                <AddNewFestivalPage />
              </Route>

              <Route exact path={"/add-new-interpret"}>
                <AddNewInterpretPage />
              </Route>

              <Route
                exact
                path="/edit-stage-list-:festivalId"
                children={<EditStageFestivalPage />}
              />

              <Route
                exact
                path="/edit-stage-performance-list-:stageId"
                children={<EditStagePerformanceList />}
              />

              <Route
                exact
                path={"/unregistered-festival-:festivalId-count-:countTickets"}
                children={<ReservationOfUnregisteredPage />}
              />

              <Route
                exact
                path={"/unregistered-festival-:festivalId-count-:countTickets"}
                children={<ReservationOfUnregisteredPage />}
              />
              <Route
                exact
                path={"/registration-unregistered-:id"}
                children={<RegistrationUnregistered />}
              />

              <Route exact path="/register">
                <div>"hello world register"</div>
              </Route>
              <Route exact path="/settings" children={<SettingsPage />} />
            </Switch>
          </Box>
        </Router>
      </UserContext.Provider>
    </div>
  );
};

export default App;
