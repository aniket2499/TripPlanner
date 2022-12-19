import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const styles = {
  // paperContainer: {
  //   backgroundImage: `url(${"https://images.unsplash.com/photo-1642860086450-f711c98b45fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"})`,
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  //   opacity: "0.5",
  //   borderRadius: "0",
  //   paddingTop: "0.1rem",
  //   height: "91.6vh",
  // },
};

function Welcome() {
  return (
    <div className="bc-image">
      <Grid container>
        <Grid item xs={6} sx={{ mt: "5rem", ml: "9rem" }}>
          <Typography variant="h3" component="h1" color="#919191">
            You'll never travel without our TRIP PLANNER again
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Welcome;
