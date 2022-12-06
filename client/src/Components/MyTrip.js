import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import {
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  CardMedia,
  Box,
  Divider,
  Icon,
  Stack,
  ListItem,
  List,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachMoneyTwoToneIcon from "@mui/icons-material/AttachMoneyTwoTone";
import LuggageTwoToneIcon from "@mui/icons-material/LuggageTwoTone";
import NoLuggageTwoToneIcon from "@mui/icons-material/NoLuggageTwoTone";
import AirlineSeatLegroomNormalTwoToneIcon from "@mui/icons-material/AirlineSeatLegroomNormalTwoTone";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import FlightTakeoffTwoToneIcon from "@mui/icons-material/FlightTakeoffTwoTone";
import FlightLandTwoToneIcon from "@mui/icons-material/FlightLandTwoTone";
import SearchFlightForm from "./Forms/SearchFlightForm";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import "../App.css";
import { Container } from "@mui/system";
const MyTrip = () => {
  const styles = {
    paperContainer: {
      height: 300,
      maxwidth: 100,
      backgroundSize: "cover",
      backgroundPosition: "center",
      margin: -24,
      padding: 24,
      backgroundImage: `url(${"https://marriottnews.brightspotcdn.com/dims4/default/dd5096c/2147483647/strip/true/crop/1920x960+0+0/resize/1920x960!/quality/100/?url=https%3A%2F%2Fmarriottnews.brightspotcdn.com%2F79%2Fc4%2F10650734b958dbc4f1691cacdb53%2Fbonvoy-endcard-15-30-60-4k-0-00-04-0534.png"})`,
    },
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={4} md={4} lg={2}>
          <Typography variant="h4" align="center" gutterBottom>
            OverView
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={6}>
          <Stack direction="column">
            <Box sx={{ width: "100%", mt: 10, borderRadius: 0 }}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                  justifyContent: "center",
                }}
                style={styles.paperContainer}
              >
                {/* <Card sx={{ maxWidth: "auto" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://marriottnews.brightspotcdn.com/dims4/default/dd5096c/2147483647/strip/true/crop/1920x960+0+0/resize/1920x960!/quality/100/?url=https%3A%2F%2Fmarriottnews.brightspotcdn.com%2F79%2Fc4%2F10650734b958dbc4f1691cacdb53%2Fbonvoy-endcard-15-30-60-4k-0-00-04-0534.png"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Trip To Marriott
                    </Typography>
                  </CardContent>
                </Card> */}
              </Paper>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Typography variant="h6" align="center" gutterBottom>
            Map
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyTrip;
