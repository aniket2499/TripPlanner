import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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
  Avatar,
} from "@mui/material";
import actions from "../actions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FlightIcon from "@mui/icons-material/Flight";
import NotesIcon from "@mui/icons-material/Notes";
import Typography from "@mui/material/Typography";
import userService from "../services/userService";
import tripService from "../services/tripService";
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
import { AuthContext } from "../firebase/Auth";
import Maps from "./Maps";
import io from "socket.io-client";
import Chat from "./Chat";
import { initializeState as initHotel } from "../reducers/hotelReducer";
import { initializeState as initRest } from "../reducers/restReducer";
import { initializeState as initAttr } from "../reducers/attractionReducer";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const socket = io.connect("http://localhost:3002");

const MyTrip = () => {
  const currUser = useContext(AuthContext);
  const id = useParams();
  const startDate = moment("2022-07-01");
  const endDate = moment("2022-07-05");
  const [itinerary, setItinerary] = useState([]);
  const days = [];
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [notes, setNotes] = useState([]);
  const [trip, setTrip] = useState([]);
  const [hotelState, setHotels] = useState([]);
  const [openCalenderButton, setOpenCalenderButton] = React.useState(false);

  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const tripId = useParams().id;
  const hotels = useSelector((state) => state.hotels);

  const joinRoom = (id) => {
    if (currUser && id) {
      socket.emit("join_room", id);
    }
  };
  useEffect(() => {
    if (currUser && id.id) {
      socket.emit("join_room", id.id);
    }
  }, [id.id]);

  let day = startDate;

  useEffect(() => {
    // storage.removeItem("persist:root");

    dispatch(initHotel(tripId));
    dispatch(initRest(tripId));
    dispatch(initAttr(tripId));

    for (let i = 0; i < hotels.length; i++) {
      hotels[i].calenderButton = false;
    }
    setHotels(hotels);
  }, []);

  const restaurants = useSelector((state) => state.restaurants);
  // console.log(restaurants, "restaurants");
  const attractions = useSelector((state) => state.attractions);
  // console.log("attractions for current trip" + JSON.stringify(attractions));
  const trips = useSelector((state) => state.trips);
  console.log("trips double check aniket:" + JSON.stringify(trips));
  const currentTrip = trips.filter((trip) => trip._id == tripId);
  console.log("currentTrip" + JSON.stringify(currentTrip));
  console.log(hotels, "state.hotels");
  while (day <= endDate) {
    days.push(day.format("YYYY-MM-DD"));
    day = day.clone().add(1, "d");
  }

  const navigate = useNavigate();
  const styles = {
    paperContainer: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: `url(${"https://st.depositphotos.com/2288675/2455/i/950/depositphotos_24553989-stock-photo-hotel.jpg"})`,
    },
  };
  console.log("itinerary" + JSON.stringify(itinerary));
  // console.log("tripId is " + tripId);
  useEffect(() => {
    const getTripData = async () => {};
    getTripData();
  }, []);
  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12} md={1.5} lg={1.5}>
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
                        <HotelIcon sx={{ mr: 2 }} />
                        <Typography variant="body2">Hotels</Typography>
                      </Button>
                      <Button>
                        <RestaurantIcon sx={{ mr: 2 }} />
                        <Typography variant="body2">Restaurants</Typography>
                      </Button>
                      <Button>
                        <FlightIcon sx={{ mr: 2 }} />
                        <Typography variant="body2">Flights</Typography>
                      </Button>
                      <Button>
                        <NotesIcon sx={{ mr: 2 }} />
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
                </List>
              </navbar>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6.5} lg={6.5}>
          <Stack direction="column">
            <Box sx={{ width: "100%", height: "20rem", borderRadius: 0, p: 0 }}>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "70%",
                }}
                style={styles.paperContainer}
              >
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  style={{ paddingBottom: 0 }}
                >
                  <Grid item xs={12} sm={12} md={8} lg={8}>
                    <Card sx={{ mt: 40 }}>
                      <CardContent>
                        <Stack direction="column" justifyContent="Center">
                          <Typography
                            variant="h5"
                            component="h1"
                            fontWeight="fontWeightBold"
                            sx={{ mt: 2, ml: 2 }}
                          >
                            {`Trip to ${currentTrip[0].destination}`}
                          </Typography>
                          <Typography
                            variant="body1"
                            fontWeight="fontWeightBold"
                            sx={{ mt: 2, ml: 2 }}
                            color="text.hint"
                          >
                            {/* {currentTrip[0].tripDate.startDate} -{" "}
                            {currentTrip[0].tripDate.endDate} */}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
            <Accordion>
              <AccordionSummary
                style={{ flexDirection: "row-reverse" }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Stack direction="row" justifyContent="end">
                  <Typography fontWeight="fontWeightBold">Hotels</Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Paper className="greyPaper" elevation={0}>
                  <Grid container>
                    {hotelState.map((hotel) => (
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Card
                          sx={{ mt: 2 }}
                          backgroundColor="primary.main"
                          style={{ backgroundColor: "" }}
                        >
                          <CardContent>
                            <Stack direction="column" justifyContent="Center">
                              <Typography
                                variant="h5"
                                component="h2"
                                fontWeight="fontWeightBold"
                                sx={{ mt: 2, ml: 2 }}
                              >
                                {hotel.name}
                              </Typography>
                              <Typography
                                variant="body1"
                                fontWeight="fontWeightBold"
                                sx={{ mt: 2, ml: 2 }}
                                color="text.hint"
                              >
                                Address
                              </Typography>
                            </Stack>
                            <Button
                              // React material UI open datepicker on button click
                              // open calendar button
                              onClick={() => {
                                hotel.calenderButton = true;
                              }}
                            >
                              <Typography
                                variant="body2"
                                fontWeight="fontWeightBold"
                                sx={{ mt: 2 }}
                                color="text.hint"
                              >
                                add to itinerary
                              </Typography>
                            </Button>
                            {hotel.calenderButton ? (
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                  open={open}
                                  onClose={() => {
                                    hotel.calenderButton = false;
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Date"
                                      margin="normal"
                                    />
                                  )}
                                />
                              </LocalizationProvider>
                            ) : null}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                style={{ flexDirection: "row-reverse" }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography fontWeight="fontWeightBold">Restaurants</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper className="greyPaper" elevation={0}>
                  <Grid container>
                    {restaurants.map(
                      (
                        restaurant, // hotels is an array of objects}
                      ) => (
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Card
                            sx={{ mt: 2 }}
                            backgroundColor="primary.main"
                            style={{ backgroundColor: "" }}
                          >
                            <CardContent>
                              <Stack direction="column" justifyContent="Center">
                                <Typography
                                  variant="h5"
                                  component="h2"
                                  fontWeight="fontWeightBold"
                                  sx={{ mt: 2, ml: 2 }}
                                >
                                  {restaurant.name}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  fontWeight="fontWeightBold"
                                  sx={{ mt: 2, ml: 2 }}
                                  color="text.hint"
                                >
                                  Address
                                </Typography>
                              </Stack>
                            </CardContent>
                          </Card>
                        </Grid>
                      ),
                    )}
                  </Grid>
                </Paper>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                style={{ flexDirection: "row-reverse" }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography fontWeight="fontWeightBold">Attractions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper className="greyPaper" elevation={0}>
                  <Grid container>
                    {attractions.map((attraction) => (
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Card
                          sx={{ mt: 2 }}
                          backgroundColor="primary.main"
                          style={{ backgroundColor: "" }}
                        >
                          <CardContent>
                            <Stack direction="column" justifyContent="Center">
                              <Typography
                                variant="h5"
                                component="h2"
                                fontWeight="fontWeightBold"
                                sx={{ mt: 2, ml: 2 }}
                              >
                                {attraction.name}
                              </Typography>
                              <Typography
                                variant="body1"
                                fontWeight="fontWeightBold"
                                sx={{ mt: 2, ml: 2 }}
                                color="text.hint"
                              >
                                Address
                              </Typography>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                style={{ flexDirection: "row-reverse" }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography fontWeight="fontWeightBold">Itinerary</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper className="greyPaper" elevation={0}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={12}>
                      <Card
                        sx={{ mt: 2 }}
                        backgroundColor="primary.main"
                        style={{ backgroundColor: "" }}
                      >
                        <CardContent>
                          <Stack direction="column" justifyContent="Center">
                            {days.map((date) => (
                              <Accordion fontWeight="fontWeightBold">
                                <Accordion>
                                  <AccordionSummary
                                    style={{ flexDirection: "row-reverse" }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                  >
                                    <Button fontWeight="fontWeightBold">
                                      {date}
                                    </Button>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    <Paper className="greyPaper" elevation={0}>
                                      <Grid container>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={12}
                                          md={6}
                                          lg={6}
                                        >
                                          <Card
                                            sx={{ mt: 2 }}
                                            backgroundColor="primary.main"
                                            style={{ backgroundColor: "" }}
                                          >
                                            <CardContent>
                                              <Stack
                                                direction="column"
                                                justifyContent="Center"
                                              >
                                                <Typography
                                                  variant="h5"
                                                  component="h2"
                                                  fontWeight="fontWeightBold"
                                                  sx={{ mt: 2, ml: 2 }}
                                                >
                                                  Hotel Name
                                                </Typography>
                                                <Typography
                                                  variant="body1"
                                                  fontWeight="fontWeightBold"
                                                  sx={{ mt: 2, ml: 2 }}
                                                  color="text.hint"
                                                >
                                                  Hotel Address
                                                </Typography>
                                              </Stack>
                                            </CardContent>
                                          </Card>
                                        </Grid>
                                      </Grid>
                                    </Paper>
                                  </AccordionDetails>
                                </Accordion>
                              </Accordion>
                            ))}
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Paper>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                style={{ flexDirection: "row-reverse" }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography fontWeight="fontWeightBold">Notes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper className="greyPaper" elevation={0}>
                  <Grid containter>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Card
                        sx={{ mt: 2 }}
                        backgroundColor="primary.main"
                        style={{ backgroundColor: "" }}
                      >
                        <CardContent>
                          <Stack direction="column" justifyContent="Center">
                            <Typography
                              variant="h5"
                              component="h2"
                              fontWeight="fontWeightBold"
                              sx={{ mt: 2, ml: 2 }}
                            >
                              Hotel Name
                            </Typography>
                            <Typography
                              variant="body1"
                              fontWeight="fontWeightBold"
                              sx={{ mt: 2, ml: 2 }}
                              color="text.hint"
                            >
                              Hotel Address
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Paper>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Typography variant="h6" align="center" gutterBottom>
            <Maps />
            <Chat socket={socket} id={id} />
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyTrip;
