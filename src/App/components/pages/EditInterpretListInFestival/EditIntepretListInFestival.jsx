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

  useEffect(() => {
    api.getInterpret().then((response) => setInterpretsData(response));
  }, []);

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
            tooltip: "Potvrdit rezervaciu",
            onClick: (event, rowData) => {
              axiosInstance
                .get(endpoints.interpret + "/" + rowData.id)
                .then((res) => {
                  if (
                    res.data["festivalInterpret"] === undefined ||
                    res.data["festivalInterpret"].length === 0
                  ) {
                    // interpret nema ziadny fest mozno ho hned pridavat do festivalu
                  } else {
                    // interpret uz ma festival,treba checkovat
                    console.log("checking for collisions");
                    let interpretIsInThisFestivalFlag = false;
                    res.data["festivalInterpret"].forEach((item, index) => {
                      if (item["festival"]["id"] === festivalId) {
                        interpretIsInThisFestivalFlag = true;
                      }
                    })
                    if(interpretIsInThisFestivalFlag === false){
                        console.log(
                            "Interpret is not in this festival"
                        );
                    }
                  else{
                        console.log(
                            "Interpret is already in"
                        );
                    }
                    ;
                  }
                });
            },
          },
          {
            icon: "clear",
            tooltip: "Zrus rezervaciu",
            onClick: (event, rowData) => {
              console.log("remove");
            },
          },
        ]}
      />
    </main>
  );
};

export default EditInterpretListInFestival;
/*
if (
                    rowData.data["festivalInterpret"] === undefined ||
                    rowData.data["festivalInterpret"].length === 0
                  ) {
                    // interpret nema ziadny fest mozno ho hned pridavat do festivalu
                  } else {
                    // interpret uz ma festival,treba checkovat
                    console.log(rowData.data["festivalInterpret"]);

                    rowData.data["festivalInterpret"].forEach((item, index) => {
                        console.log(item)
                    });
                  }
* */
