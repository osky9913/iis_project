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

const EditInterpretListInFestival = (props) => {
  const classes = useStyles();

  const [interpretsData, setInterpretsData] = useState([]);
  const { festivalId } = useParams();
  const [festival, setFestival] = useState([]);

  const isInterpretOnFestival = (id) => {
    if (festival.length !== 0 && festival["festivalInterpret"]) {
      let searchedInterpret = festival["festivalInterpret"].find(
        (interpret) => interpret["interpret"]["id"] === id
      );
      if (searchedInterpret) {
        return playing[1];
      } else {
        return playing[0];
      }
    }
  };

  const playing = {
    0: "Nehra",
    1: "Hra",
  };

  useEffect(() => {
    if (festival) {
      api.getInterpret().then((response) => {
        const dataInterprets = [];

        response.forEach((data) => {
          let tempData = {
            name: data["name"],
            logoUri: data["logoUri"],
            rating: data["rating"],
            genre: data["genre"],
            id: data["id"],
            playing: isInterpretOnFestival(data["id"]),
          };
          dataInterprets.push(tempData);
        });

        setInterpretsData(dataInterprets);
      });
    }
  }, [festival]);

  useEffect(() => {
    api
      .getFestivalByID(festivalId)
      .then((response) => setFestival(response.data));
  }, []);

  console.log(interpretsData);
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <MaterialTable
        title="Pridat alebo odstranit intrepretov z festivalu"
        columns={[
          {
            field: "logoUri",
            title: "Avatar",
            render: (rowData) => (
              <img
                src={rowData.logoUri}
                style={{ width: 50, borderRadius: "50%" }}
                alt=""
              />
            ),
          },
          { title: " Hra na festivale", field: "playing" },
          { title: "Nazov interpreta", field: "name" },
          {
            title: "Genre",
            field: "genre",
            lookup: {
              0: "Rock",
              1: "Pop",
              2: "Metal",
              3: "HipHop",
              4: "Emd",
              5: "Chill",
            },
          },

          { title: "Rating", field: "rating" },
        ]}
        data={interpretsData}
        actions={[
          {
            icon: "check",
            tooltip: "Pridat interpreta",
            onClick: (event, rowData) => {
              axiosInstance
                .get(endpoints.interpret + "/" + rowData.id)
                .then((res) => {
                  if (
                    res.data["festivalInterpret"] === undefined ||
                    res.data["festivalInterpret"].length === 0
                  ) {
                    axiosInstance
                      .post("FestivalInterpret", {
                        festivalId: festivalId,
                        interpretId: rowData["id"],
                      })
                      .then((resp) => {
                        if (resp.status === 200) {
                          location.reload();
                        }
                      });
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
                      axiosInstance
                        .post("FestivalInterpret", {
                          festivalId: festivalId,
                          interpretId: rowData["id"],
                        })
                        .then((resp) => {
                          if (resp.status === 200) {
                            location.reload();
                          }
                        });
                    } else {
                      alert("Interpret is already in");
                    }
                  }
                });
            },
          },
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

export default EditInterpretListInFestival;
