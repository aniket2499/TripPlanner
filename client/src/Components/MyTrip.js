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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  const startDate = moment("2022-23-22");
  const endDate = moment("2020-29-22");
  let currentDate = moment(startDate);
  const dateArray = [];

  while (currentDate <= endDate) {
    dateArray.push(currentDate.format("MM-DD-YYYY"));
    currentDate = moment(currentDate).add(1, "days");
  }
  console.log(dateArray);
  const navigate = useNavigate();
  const styles = {
    paperContainer: {
      height: 300,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: `url(https://media.istockphoto.com/id/1320815200/photo/wall-black-background-for-design-stone-black-texture-background.jpg?b=1&s=170667a&w=0&k=20&c=Q6PzuL91wGD5u6p_-g7McRPMXvlWHedM7Dmi4LWOjVE=)`,
    },
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={1.5} style={{ backgroundColor: "white" }}>
          <div className="navbar">
            <div className="navbar__links">
              <navbar>
                <List>
                  <Accordion>
                    <AccordionSummary
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
                        <Typography fontWeight="fontWeightBold">
                          Hotels
                        </Typography>
                      </Button>
                      <Button>
                        <Typography fontWeight="fontWeightBold">
                          Restaurants
                        </Typography>
                      </Button>
                      <Button>
                        <Typography fontWeight="fontWeightBold">
                          Flights
                        </Typography>
                      </Button>
                      <Button>
                        <Typography fontWeight="fontWeightBold">
                          Notes
                        </Typography>
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography fontWeight="fontWeightBold">
                        Itinerary
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {dateArray.map((date) => (
                        <Typography fontWeight="fontWeightBold">
                          {date}
                        </Typography>
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
        <Grid item xs={6} style={{ backgroundColor: "red" }}>
          <Stack direction="column">
            <Box>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
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
          <Stack direction="column">
            <Box>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
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
        <Grid item xs={4.5} style={{ backgroundColor: "blue" }}>
          <Typography variant="h6" align="center" gutterBottom>
            Map
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyTrip;
