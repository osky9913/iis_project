import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { api, axiosInstance } from "../../../../api/api";
import { endpoints } from "../../../../api/apiConstants";
import Avatar from "@material-ui/core/Avatar";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 3),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(6, 2, 2, 11),
  },
}));

const EditStageFestivalPage = (props) => {
  const classes = useStyles();

  const [interpretsData, setInterpretsData] = useState([]);
  const { festivalId } = useParams();
  const [stages, setStages] = useState([]);

  useEffect(() => {
    api.getStage().then((response) => {
      let stages = [];
      response.forEach((data) => {
        let stage;
        if (data["festival"] === null) {
          stage = {
            name: data["name"],
            capacity: data["capacity"],
            festival: "",
            stageInterpret: data["stageInterpret"],
            id: data["id"],
          };
        } else {
          stage = {
            name: data["name"],
            capacity: data["capacity"],
            festival: data["festival"],
            stageInterpret: data["stageInterpret"],
            id: data["id"],
          };
        }
        stages.push(stage);
      });

      setStages(stages);
    });
  }, []);

  console.log(stages);
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <MaterialTable
        title="Pridat alebo odstranit intrepretov z festivalu"
        columns={[
          { title: "Nazov stage", field: "name" },
          { title: "Kapacita", field: "capacity" },
          { title: "Festival", field: "capacity" },

          { title: "Rating", field: "rating" },
        ]}
        data={stages}
        actions={[
          {
            icon: "clear",
            tooltip: "Zrus rezervaciu",
            onClick: (event, rowData) => {
              axiosInstance
                .get(endpoints.interpret + "/" + rowData.id)
                .then((res) => {
                  if (
                    res.data["festivalInterpret"] === undefined ||
                    res.data["festivalInterpret"].length === 0
                  ) {
                    alert("Interpret is not playin in festival");

                    // interpret nema ziadny fest mozno ho hned pridavat do festivalu
                  } else {
                    // interpret uz ma festival,treba checkovat
                    console.log("checking for collisions");
                    let interpretIsInThisFestivalFlag = false;
                    res.data["festivalInterpret"].forEach((item, index) => {
                      if (item["festival"]["id"] === festivalId) {
                        interpretIsInThisFestivalFlag = true;
                      }
                    });
                    if (interpretIsInThisFestivalFlag === false) {
                      alert("Interpret is not playin in festival");
                    } else {
                      axiosInstance
                        .delete(
                          "FestivalInterpret/" +
                            festivalId +
                            "/" +
                            rowData["id"],
                          {}
                        )
                        .then((resp) => {
                          if (resp.status === 200) {
                            location.reload();
                          }
                        });
                    }
                  }
                });
            },
          },
        ]}
      />
    </main>
  );
};

export default EditStageFestivalPage;
