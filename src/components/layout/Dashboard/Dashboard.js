import React, { useEffect, useState } from "react";
import AppBar from "../AppBar/CustomAppBar";
import { api } from "../../../api/api";
import Box from "@material-ui/core/Box";
import { FestivalDashboard } from "../FestivalDashboard/FestivalDashboard";

export default function Dashboard() {
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    api.getFestival().then((festivals) => setFestivals(festivals));
  }, []);

  return (
    <Box>
        <AppBar/>
        <FestivalDashboard festivals={festivals}/>
    </Box>
  );
}
