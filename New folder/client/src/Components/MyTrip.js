import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import "./chat.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteHotel } from "../reducers/hotelReducer";
import PlaceIcon from "@mui/icons-material/Place";
import LandscapeIcon from "@mui/icons-material/Landscape";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { saveAs } from "file-saver";

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
  Rating,
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
import GoogleMapReact from "google-map-react";
import CircularProgress from "@mui/material";
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
import { initializeState as initTrip } from "../reducers/tripsReducer";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const socket = io.connect("http://localhost:3002");

const MyTrip = () => {
  const currUser = useContext(AuthContext);
  const id = useParams();
  const navigate = useNavigate();
  // let coords = null;
  // const [coord, setCoords] = useState({});
  const [lat, setLat] = useState(undefined);
  const [lng, setLng] = useState(undefined);
  const [tripdata, setTripdata] = useState(undefined);
  const [allCoords, setAllCoords] = useState([{}]);
  // let coords = { lat: 40.7127753, lng: 74.0059728 };
  // useEffect(() => {
  //   async function fetchData() {
  //     const data = tripService.getTripById(id);
  //   }
  //   setTripdata(data);
  //   fetchData();
  // }, []);
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const data = await tripService.getTripById(id);
  //       setTripdata(data);
  //     } catch (error) {
  //       console.log(error);
  //       // navigate("/404");
  //     }
  //   }
  //   fetchData();
  //   return () => {
  //     // location.state.destination = "";
  //     console.log("cleaned up");
  //   };
  // }, []);

  const stylesMaps = {
    paper: {
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100px",
      borderRadius: "100",
    },
    mapContainer: {
      height: "100vh",
      width: "100%",
    },
    markerContainer: {
      position: "absolute",
      transform: "translate(-50%, -50%)",
      zIndex: 1,
      "&:hover": { zIndex: 2 },
    },
    pointer: {
      cursor: "pointer",
    },
  };

  useEffect(() => {
    async function verifyTrip(id) {
      const getTrip = await userService.getUserById(currUser._delegate.uid);
      const bool = getTrip.trips.includes(id);
      if (!bool) {
        alert("You cannot access this trip");
        navigate("/home");
      }
    }
    verifyTrip(id.id);
    if (currUser && id.id) {
      socket.emit("join_room", id.id);
    }
  }, [id.id]);

  const days = [];
  const [restaurantState, setRestaurants] = useState([]);
  const [attractionState, setAttractions] = useState([]);

  const [notesValue, setNotesValue] = useState("");

  const dispatch = useDispatch();
  const tripId = useParams().id;

  const trips = useSelector((state) => state.trips);
  console.log(trips);

  const hotels = useSelector((state) => state.hotels);
  console.log(hotels);

  const restaurants = useSelector((state) => state.restaurants);
  const attractions = useSelector((state) => state.attractions);

  let currentTrip = [];
  let startDate = "";
  let endDate = "";
  // console.log("trips are: " + JSON.stringify(trips));
  if (trips.length !== 0) {
    currentTrip = trips.filter((trip) => trip._id === tripId);
    startDate = moment(currentTrip[0].tripDate.startDate);
    endDate = moment(currentTrip[0].tripDate.endDate);
    let day = startDate;
    while (day <= endDate) {
      days.push(day.format("YYYY-MM-DD"));
      day = day.clone().add(1, "d");
    }
  }

  useEffect(() => {
    console.log("event fired");
    async function fetchData(id) {
      await dispatch(actions.initializeUser(currUser._delegate.uid));
      await dispatch(initTrip());
      await dispatch(initHotel(tripId));
      await dispatch(initRest(tripId));
      await dispatch(initAttr(tripId));
    }
    fetchData(id.id);
  }, []);

  useEffect(() => {
    // console.log("hotels", hotels);
    if (restaurants && restaurants.length) {
      for (let i = 0; i < restaurants.length; i++) {
        let newObj = {
          lat: Number(restaurants[i].latitude),
          lng: Number(restaurants[i].longitude),
        };
        console.log(newObj);
        setAllCoords((allCoords) => [...allCoords, newObj]);
      }
    }
    if (hotels && hotels.length) {
      for (let i = 0; i < hotels.length; i++) {
        let newObj = {
          lat: hotels[i].latitude,
          lng: hotels[i].longitude,
        };
        setAllCoords((allCoords) => [...allCoords, newObj]);
      }
    }
    if (attractions && attractions.length) {
      for (let i = 0; i < attractions.length; i++) {
        let newObj = {
          lat: Number(attractions[i].latitude),
          lng: Number(attractions[i].longitude),
        };
        setAllCoords((allCoords) => [...allCoords, newObj]);
      }
    }
  }, [restaurants, hotels, attractions]);
  console.log(allCoords, "allCoords");
  let coords = { lat, lng };
  useEffect(() => {
    if (currentTrip[0]) {
      setLat(
        Number(currentTrip[0] || trips[0] ? currentTrip[0].destCord.lat : ""),
      );
      setLng(
        Number(currentTrip[0] || trips[0] ? currentTrip[0].destCord.long : ""),
      );
    }
  }, [currentTrip]);

  useEffect(() => {
    async function fetchData(id) {
      let data = await tripService.getTripById(id);
      setNotesValue(data.notes);
    }

    fetchData(id.id);
  }, [id]);

  let userArray = [];

  // if (currentTrip.length === 0) {
  // currentTrip[0].users.map((item) => {
  //   userService.getUserById(item).then((res) => {
  //     const userObj = {
  //       name: res.displayName,
  //       email: res.email,
  //     };
  //     userArray.push(userObj);
  //   });
  // });
  // // }

  console.log(userArray, "userArray");

  const handleDownload = (e) => {
    e.preventDefault();
    if (currentTrip[0] && hotels && restaurants && attractions && userArray) {
      const objectForPDF = {
        trip: currentTrip[0],
        hotels: hotels,
        restaurants: restaurants,
        attractions: attractions,
        users: userArray,
      };
      console.log("objectForPDF", objectForPDF);
      tripService.createPDF(objectForPDF).then((res) => {
        tripService.fetchPDF().then((res) => {
          const file = new Blob([res.data], { type: "application/pdf" });
          saveAs(file, "trip.pdf");
        });
      });
    }
  };
  const handleNotesSubmit = async (e) => {
    e.preventDefault();
    let newObj = {
      notes: notesValue,
    };
    console.log(newObj, "Inside handle");
    try {
      await tripService.updateTripById(id.id, newObj);
    } catch (e) {
      // navigate("/404", { state: { message: e } });
      alert(e.message);
    }
  };

  const styles = {
    paperContainer: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: `url(${
        currentTrip && currentTrip[0] && currentTrip[0].image
          ? currentTrip[0].image
          : `https://tripplannercs554.s3.amazonaws.com/AttractionImages/${Math.floor(
              Math.random() * 100 + 1,
            )}.jpg`
      })`,
    },
  };
  // console.log("tripId is " + tripId);

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12} md={1.5} lg={1.5}>
          <div className="navbar">
            <div className="navbar__links">
              <navbar>
                <List sx={{ marginTop: "3.2rem" }}>
                  <Accordion defaultExpanded={true}>
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
                      <Button
                        onClick={() => {
                          navigate(`/hotels/${tripId}`);
                        }}
                      >
                        <HotelIcon sx={{ mr: 2 }} />
                        <Typography variant="body2">Hotels</Typography>
                      </Button>
                      <Button
                        onClick={() => {
                          navigate(`/restaurants/${tripId}`);
                        }}
                      >
                        <RestaurantIcon sx={{ mr: 2 }} />
                        <Typography variant="body2">Restaurants</Typography>
                      </Button>
                      <Button
                        onClick={() => {
                          navigate(`/attractions/${tripId}`);
                        }}
                      >
                        <LandscapeIcon sx={{ mr: 2 }} />
                        <Typography variant="body2">Attractions</Typography>
                      </Button>
                      <Button
                        onClick={() => {
                          navigate(`/flights`);
                        }}
                      >
                        <FlightIcon sx={{ mr: 2 }} />
                        <Typography variant="body2">Flights</Typography>
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion defaultExpanded={true}>
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

        <Grid container item xs={10.5}>
          {/* <Grid> */}
          {/* <Grid container spacing={2}> */}
          <Grid
            item
            xs={12}
            sm={12}
            md={7}
            lg={6}
            style={{ backgroundColor: "#ffffff" }}
            sx={{ overflow: "auto" }}
            height="100vh"
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Stack direction="column">
                <Box
                  sx={{ width: "100%", height: "20rem", borderRadius: 0, p: 0 }}
                >
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
                      {currentTrip.length &&
                        currentTrip.map((trip) => (
                          <Grid item xs={12} sm={12} md={8} lg={8}>
                            <Card sx={{ mt: 40 }}>
                              <CardContent>
                                <Stack
                                  direction="column"
                                  justifyContent="Center"
                                >
                                  <Typography
                                    variant="h5"
                                    component="h1"
                                    fontWeight="fontWeightBold"
                                    sx={{ mt: 2, ml: 2 }}
                                  >
                                    {`Trip to ${
                                      trip && trip.destination
                                        ? trip.destination.split(",")[0]
                                        : "No Destination"
                                    }`}
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    fontWeight="fontWeightBold"
                                    sx={{ mt: 2, ml: 2 }}
                                    color="text.hint"
                                  >
                                    {`${trip.tripDate.startDate} - ${trip.tripDate.endDate}`}
                                  </Typography>
                                </Stack>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                    </Grid>
                  </Paper>
                </Box>
                <Grid container sx={{ mb: "1rem" }}>
                  <Grid item xs={6} sx={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        navigate(`/${tripId}/invite`);
                      }}
                      sx={{ mt: 2, ml: 2 }}
                    >
                      invite
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleDownload}
                      sx={{ mt: 2, ml: 2 }}
                    >
                      Download PDF
                    </Button>
                  </Grid>
                </Grid>
                <Accordion>
                  <AccordionSummary
                    style={{ flexDirection: "row-reverse" }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Stack direction="row" justifyContent="end">
                      <Typography fontWeight="fontWeightBold">
                        Hotels
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Paper className="greyPaper" elevation={0}>
                      <Grid container>
                        <Card styles={{ padding: "1.5rem" }}>
                          {hotels.length &&
                            hotels.map((hotel, index) => (
                              <div key={index}>
                                <Box sx={{ p: 1 }}>
                                  <Divider
                                    styles={{
                                      backgroundColor: "blue",
                                      paddingTop: 0.5,
                                      paddingBottom: 0.5,
                                      marginTop: "1rem",
                                      marginBottom: "1rem",
                                    }}
                                  />
                                  <div>
                                    <Container>
                                      <Grid
                                        container
                                        sx={{ mt: "1rem", mb: "1rem" }}
                                      >
                                        <Grid item xs={12} sm={9} md={8} lg={8}>
                                          <Stack direction="row">
                                            <Avatar
                                              sx={{
                                                backgroundColor: "primary.main",
                                                mr: "1rem",
                                              }}
                                            >
                                              {index + 1}
                                            </Avatar>
                                            <Stack
                                              direction="row"
                                              justifyContent="flex-end"
                                              sx={{ width: "100%", mr: "1rem" }}
                                            >
                                              <Button
                                                color="primary"
                                                onClick={(e) =>
                                                  navigate(`/hotels/${tripId}`)
                                                }
                                              >
                                                <EditRoundedIcon />
                                              </Button>
                                            </Stack>
                                          </Stack>

                                          <Typography
                                            variant="h6"
                                            component="div"
                                            fontWeight="fontWeightBold"
                                            sx={{ mr: "1rem" }}
                                          >
                                            {/* {console.log(hotel[0].name)} */}
                                            {hotel[0] ? hotel[0].name : "N/a"}
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            component="div"
                                            style={{
                                              paddingTop: "0.2rem",
                                            }}
                                          >
                                            The gateway was built in 1924, in
                                            memorial to King George V of
                                            England, who landed in India at the
                                            same place in 1911.
                                          </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={3} md={4} lg={4}>
                                          <CardMedia
                                            component="img"
                                            height="150"
                                            width="50"
                                            image={
                                              hotel[0]
                                                ? hotel[0].image
                                                : `https://tripplannercs554.s3.amazonaws.com/HotelImages/${Math.floor(
                                                    Math.random() * 300 + 1,
                                                  )}.jpg`
                                            }
                                            alt="green iguana"
                                            style={{
                                              borderRadius: 11,
                                              mr: "2rem",
                                            }}
                                            // adding on click for opening modalForHotel
                                          />
                                        </Grid>
                                      </Grid>
                                    </Container>
                                  </div>
                                </Box>
                              </div>
                            ))}
                        </Card>
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
                    <Typography fontWeight="fontWeightBold">
                      Restaurants
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Paper className="greyPaper" elevation={0}>
                      <Grid container>
                        <Card styles={{ padding: "1.5rem" }}>
                          {restaurants.length &&
                            restaurants.map((restaurant, index) => (
                              <div key={index}>
                                <Box sx={{ p: 1 }}>
                                  <Divider
                                    styles={{
                                      backgroundColor: "blue",
                                      paddingTop: 0.5,
                                      paddingBottom: 0.5,
                                      marginTop: "1rem",
                                      marginBottom: "1rem",
                                    }}
                                  />
                                  <div>
                                    <Container>
                                      <Grid
                                        container
                                        sx={{ mt: "1rem", mb: "1rem" }}
                                      >
                                        <Grid item xs={12} sm={9} md={8} lg={8}>
                                          <Stack direction="row">
                                            <Avatar
                                              sx={{
                                                backgroundColor: "primary.main",
                                                mr: "1rem",
                                              }}
                                            >
                                              {index + 1}
                                            </Avatar>
                                            <Stack
                                              direction="row"
                                              justifyContent="flex-end"
                                              sx={{ width: "100%", mr: "1rem" }}
                                            >
                                              <Button
                                                color="primary"
                                                onClick={(e) =>
                                                  navigate(
                                                    `/restaurants/${tripId}`,
                                                  )
                                                }
                                              >
                                                <EditRoundedIcon />
                                              </Button>
                                            </Stack>
                                          </Stack>

                                          <Typography
                                            variant="h6"
                                            component="div"
                                            fontWeight="fontWeightBold"
                                            sx={{ mr: "1rem" }}
                                          >
                                            {/* {console.log(hotel[0].name)} */}
                                            {restaurant[0]
                                              ? restaurant[0].name
                                              : "N/a"}
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            component="div"
                                            style={{
                                              paddingTop: "0.2rem",
                                            }}
                                          >
                                            The gateway was built in 1924, in
                                            memorial to King George V of
                                            England, who landed in India at the
                                            same place in 1911.
                                          </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={3} md={4} lg={4}>
                                          <CardMedia
                                            component="img"
                                            height="150"
                                            width="50"
                                            image={
                                              restaurant[0]
                                                ? restaurant[0].image
                                                : `https://tripplannercs554.s3.amazonaws.com/restarurantsImages/${Math.floor(
                                                    Math.random() * 300 + 1,
                                                  )}.jpg`
                                            }
                                            alt="green iguana"
                                            style={{
                                              borderRadius: 11,
                                              mr: "2rem",
                                            }}
                                            // adding on click for opening modalForHotel
                                          />
                                        </Grid>
                                      </Grid>
                                    </Container>
                                  </div>
                                </Box>
                              </div>
                            ))}
                        </Card>
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
                    <Typography fontWeight="fontWeightBold">
                      Attractions
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Paper className="greyPaper" elevation={0}>
                      <Grid container>
                        <Card styles={{ padding: "1.5rem" }}>
                          {attractions.length &&
                            attractions.map((attraction, index) => (
                              <div key={index}>
                                <Box sx={{ p: 1 }}>
                                  <Divider
                                    styles={{
                                      backgroundColor: "blue",
                                      paddingTop: 0.5,
                                      paddingBottom: 0.5,
                                      marginTop: "1rem",
                                      marginBottom: "1rem",
                                    }}
                                  />
                                  <div>
                                    <Container>
                                      <Grid
                                        container
                                        sx={{ mt: "1rem", mb: "1rem" }}
                                      >
                                        <Grid item xs={12} sm={9} md={8} lg={8}>
                                          <Stack direction="row">
                                            <Avatar
                                              sx={{
                                                backgroundColor: "primary.main",
                                                mr: "1rem",
                                              }}
                                            >
                                              {index + 1}
                                            </Avatar>
                                            <Stack
                                              direction="row"
                                              justifyContent="flex-end"
                                              sx={{ width: "100%", mr: "1rem" }}
                                            >
                                              <Button
                                                color="primary"
                                                onClick={(e) =>
                                                  navigate(
                                                    `/attractions/${tripId}`,
                                                  )
                                                }
                                              >
                                                <EditRoundedIcon />
                                              </Button>
                                            </Stack>
                                          </Stack>

                                          <Typography
                                            variant="h6"
                                            component="div"
                                            fontWeight="fontWeightBold"
                                            sx={{ mr: "1rem" }}
                                          >
                                            {/* {console.log(hotel[0].name)} */}
                                            {attraction[0]
                                              ? attraction[0].name
                                              : "N/a"}
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            component="div"
                                            style={{
                                              paddingTop: "0.2rem",
                                            }}
                                          >
                                            The gateway was built in 1924, in
                                            memorial to King George V of
                                            England, who landed in India at the
                                            same place in 1911.
                                          </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={3} md={4} lg={4}>
                                          <CardMedia
                                            component="img"
                                            height="150"
                                            width="50"
                                            image={
                                              attraction[0]
                                                ? attraction[0].image
                                                : `https://tripplannercs554.s3.amazonaws.com/attractionsImages/${Math.floor(
                                                    Math.random() * 300 + 1,
                                                  )}.jpg`
                                            }
                                            alt="green iguana"
                                            style={{
                                              borderRadius: 11,
                                              mr: "2rem",
                                            }}
                                            // adding on click for opening modalForHotel
                                          />
                                        </Grid>
                                      </Grid>
                                    </Container>
                                  </div>
                                </Box>
                              </div>
                            ))}
                        </Card>
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
                    <Typography fontWeight="fontWeightBold">
                      Itinerary
                    </Typography>
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
                                <Stack
                                  direction="column"
                                  justifyContent="Center"
                                >
                                  {currentTrip.length &&
                                    currentTrip[0].itinerary.length &&
                                    currentTrip[0].itinerary.map((day) => (
                                      <Accordion fontWeight="fontWeightBold">
                                        {console.log(
                                          "*************************",
                                        )}
                                        {console.log(day)}
                                        <Accordion>
                                          <AccordionSummary
                                            style={{
                                              flexDirection: "row-reverse",
                                            }}
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                          >
                                            <Button fontWeight="fontWeightBold">
                                              {day.date}
                                            </Button>
                                          </AccordionSummary>
                                          <AccordionDetails>
                                            <Paper
                                              className="greyPaper"
                                              elevation={0}
                                            >
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
                                                    style={{
                                                      backgroundColor: "",
                                                    }}
                                                  >
                                                    <CardContent>
                                                      <Stack
                                                        direction="column"
                                                        justifyContent="Center"
                                                      >
                                                        {day.placesToVisit.map(
                                                          (place, index) => (
                                                            <div
                                                              key={place._id}
                                                            >
                                                              <Box
                                                                sx={{ p: 1 }}
                                                              >
                                                                <Divider
                                                                  styles={{
                                                                    backgroundColor:
                                                                      "blue",
                                                                    paddingTop: 0.5,
                                                                    paddingBottom: 0.5,
                                                                    marginTop:
                                                                      "1rem",
                                                                    marginBottom:
                                                                      "1rem",
                                                                  }}
                                                                />
                                                                <div>
                                                                  <Container>
                                                                    <Grid
                                                                      container
                                                                      sx={{
                                                                        mt: "1rem",
                                                                        mb: "1rem",
                                                                      }}
                                                                    >
                                                                      <Grid
                                                                        item
                                                                        xs={12}
                                                                        sm={9}
                                                                        md={8}
                                                                        lg={8}
                                                                      >
                                                                        <Stack direction="row">
                                                                          <Avatar
                                                                            sx={{
                                                                              backgroundColor:
                                                                                "primary.main",
                                                                              mr: "1rem",
                                                                            }}
                                                                          >
                                                                            {index +
                                                                              1}
                                                                          </Avatar>
                                                                          <Stack
                                                                            direction="row"
                                                                            justifyContent="flex-end"
                                                                            sx={{
                                                                              width:
                                                                                "100%",
                                                                              mr: "1rem",
                                                                            }}
                                                                          ></Stack>
                                                                        </Stack>

                                                                        <Typography
                                                                          variant="h6"
                                                                          component="div"
                                                                          fontWeight="fontWeightBold"
                                                                          sx={{
                                                                            mr: "1rem",
                                                                          }}
                                                                        >
                                                                          {/* {console.log(hotel[0].name)} */}
                                                                          {place
                                                                            ? place.name
                                                                            : "N/a"}
                                                                        </Typography>
                                                                      </Grid>

                                                                      <Grid
                                                                        item
                                                                        xs={12}
                                                                        sm={3}
                                                                        md={4}
                                                                        lg={4}
                                                                      >
                                                                        <CardMedia
                                                                          component="img"
                                                                          height="150"
                                                                          width="50"
                                                                          image={
                                                                            place
                                                                              ? place.image
                                                                              : `https://tripplannercs554.s3.amazonaws.com/HotelImages/${Math.floor(
                                                                                  Math.random() *
                                                                                    300 +
                                                                                    1,
                                                                                )}.jpg`
                                                                          }
                                                                          alt="green iguana"
                                                                          style={{
                                                                            borderRadius: 11,
                                                                            mr: "2rem",
                                                                          }}
                                                                          // adding on click for opening modalForHotel
                                                                        />
                                                                      </Grid>
                                                                    </Grid>
                                                                  </Container>
                                                                  {place.type ? (
                                                                    <Typography
                                                                      variant="h4"
                                                                      fontWeight="fontWeightBold"
                                                                      sx={{
                                                                        mt: 2,
                                                                        ml: 2,
                                                                      }}
                                                                      color="text.hint"
                                                                    >
                                                                      {
                                                                        place.type
                                                                      }
                                                                    </Typography>
                                                                  ) : (
                                                                    <Typography
                                                                      variant="h4"
                                                                      fontWeight="fontWeightBold"
                                                                      sx={{
                                                                        mt: 2,
                                                                        ml: 2,
                                                                      }}
                                                                      color="text.hint"
                                                                    >
                                                                      hotel
                                                                    </Typography>
                                                                  )}
                                                                </div>
                                                              </Box>
                                                            </div>
                                                          ),
                                                        )}
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
                    <form onSubmit={handleNotesSubmit}>
                      <textarea
                        className="note"
                        type="text"
                        name="notes"
                        placeholder="Write or paste anything here:how to get around, tips and tricks"
                        value={notesValue ? notesValue : ""}
                        id="notes"
                        onChange={(e) => {
                          setNotesValue(e.target.value);
                        }}
                      ></textarea>

                      <Button id="submitButton" type="submit">
                        Add Notes
                      </Button>
                    </form>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    style={{ flexDirection: "row-reverse" }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography fontWeight="fontWeightBold">
                      Group Chats
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Chat socket={socket} id={id} />
                  </AccordionDetails>
                </Accordion>
              </Stack>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={5} lg={6}></Grid> */}
          {/* </Grid> */}
          {/* </Grid> */}
          <Grid item xs={12} sm={12} md={5} lg={6}>
            <Typography variant="h6" align="center" gutterBottom>
              <div id="mapContainer" style={stylesMaps.mapContainer}>
                {currentTrip && coords && (
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
                    // defaultCenter={coords}
                    center={coords}
                    defaultZoom={11}
                    margin={[50, 50, 50, 50]}
                    // options={""}
                    options={{
                      disableDefaultUI: true,
                      zoomControl: true,
                    }}
                  ></GoogleMapReact>
                )}
              </div>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyTrip;
