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
  TextField,
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
      backgroundImage: `url(${"https://i.pinimg.com/736x/d6/2c/6f/d62c6fab8756a07ce13d30059120cc32.jpg"})`,
    },
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={2}>
          <Typography variant="h4" align="center" gutterBottom>
            OverView
          </Typography>
        </Grid>
        <Grid item xs={612} sm={12} md={6} lg={6}>
          <Stack direction="column">
            <Box sx={{ width: "90%", mt: 10, borderRadius: 0, p: 5, m: 5 }}>
              <Paper
                sx={{
                  m: 5,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                  justifyContent: "center",
                }}
                style={styles.paperContainer}
              >
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} sm={12} md={8} lg={8}>
                    <Card>
                      <CardContent>
                        <Stack direction="column" justifyContent="Center">
                          <Stack direction="row" justifyContent="Center">
                            <TextField
                              label="name"
                              variant="outlined"
                              backgroundColor="primary.secondary"
                              sx={{ width: "70%" }}
                              placeholder="name"
                            />
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="Center"
                          >
                            <Button
                              color="primary"
                              variant="contained"
                              sx={{ width: "30%", mt: 5 }}
                            >
                              Edit
                            </Button>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Typography variant="h6" align="center" gutterBottom>
            Map
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyTrip;
