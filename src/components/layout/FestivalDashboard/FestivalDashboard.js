import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FestivalCard from "./FestivalCard/FestivalCard";

export const FestivalDashboard = (props) => {
  const festivals = props.festivals;

  return (
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
  );
};
