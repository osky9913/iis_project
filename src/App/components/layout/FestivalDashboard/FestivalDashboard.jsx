import React, { useContext } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FestivalCard from "./FestivalCard/FestivalCard";
import UserContext from "../../../../context/UserContext";

export const FestivalDashboard = (props) => {
  const festivals = props.festivals;
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      {user["user"] ? (
        <p>You are Logged {user["user"]["name"]}</p>
      ) : (
        <div style={{ padding: "20px" }}>
          <Container maxWidth="lg">
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={3}
            >
              {festivals.map((festival, index) => (
                <Grid item key={index}>
                  <FestivalCard festival={festival} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      )}
    </div>
  );
};
