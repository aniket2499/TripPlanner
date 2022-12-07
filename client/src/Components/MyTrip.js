import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import moment from "moment";

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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  AppBar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FlightIcon from "@mui/icons-material/Flight";
import NotesIcon from "@mui/icons-material/Notes";
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
import { Link } from "react-router-dom";
const MyTrip = () => {
  const startDate = moment("2022-07-01");
  const endDate = moment("2022-07-05");

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    days.push(day.format("YYYY-MM-DD"));
    day = day.clone().add(1, "d");
  }

  const navigate = useNavigate();
  const styles = {
    paperContainer: {
      height: 300,
      backgroundSize: "cover",
      backgroundPosition: "center",
      margin: -24,
      padding: 24,
      backgroundImage: `url(${"https://st.depositphotos.com/2288675/2455/i/950/depositphotos_24553989-stock-photo-hotel.jpg"})`,
    },
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={1.5}>
          <div className="navbar">
            <div className="navbar__links">
              <navbar>
                <List>
                  <Accordion>
                    <AccordionSummary
                      style={{ flexDirection: "row-reverse" }}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography fontWeight="fontWeightBold">
                        Overview
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Button>
                        <HotelIcon />
                        <Typography variant="body2">Hotels</Typography>
                      </Button>
                      <Button>
                        <RestaurantIcon />
                        <Typography variant="body2">Restaurants</Typography>
                      </Button>
                      <Button>
                        <FlightIcon />
                        <Typography variant="body2">Flights</Typography>
                      </Button>
                      <Button>
                        <NotesIcon />
                        <Typography variant="body2">Notes</Typography>
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      style={{ flexDirection: "row-reverse" }}
                      expandIcon={<ExpandMoreIcon />}
                      IconButtonProps={{ edge: "start" }}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography fontWeight="fontWeightBold">
                        Itinerary
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {days.map((date) => (
                        <Button fontWeight="fontWeightBold">{date}</Button>
                      ))}
                    </AccordionDetails>
                  </Accordion>

                  {/* <ListItem>
                <Button variant="contained" color="primary" size="large">
                  OverView
                </Button>
              </ListItem>
              <ListItem>
                <Button variant="contained" color="primary" size="large">
                  My Rewards
                </Button>
              </ListItem>
              <ListItem>
                <Button variant="contained" color="primary" size="large">
                  My Luggage
                </Button>
              </ListItem> */}
                </List>
              </navbar>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6.5}>
          <Stack direction="column">
            <Box sx={{ width: "90%", mt: 10, borderRadius: 0, p: 5, m: 5 }}>
              <Paper
                sx={{
                  m: 5,
                  p: 2,

                  display: "flex",
                  flexDirection: "column",
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
