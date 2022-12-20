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
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import GoogleMapReact from "google-map-react";
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

  const removeHotelFromBin = (tripId, hotelId, hotel) => {
    console.log("tripId", "hotelId");
    console.log(tripId, hotelId);
    console.log("hotel");
    console.log(hotel);
    dispatch(actions.unbinHotel(tripId, hotelId));
    dispatch(deleteHotel(tripId, hotelId, hotel));
  };

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
    // console.log(currentTrip[0].destCord.lat, "trip-===-");
    // console.log(currentTrip[0].destCord.long, "trip-===-");

    // coords = {
    //   lat: currentTrip[0].destCord.lat,
    //   lng: currentTrip[0].destCord.long,
    // };
  }, []);

  console.log(currentTrip, "cirrtrip");
  // useEffect(()=>{

  // })

  let coords = { lat, lng };
  console.log(coords);
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

  const handleDeleteHotel = (e, tripId, hotelId, hotel) => {
    e.preventDefault();
    console.log("edit hotel");
    dispatch(deleteHotel(tripId, hotelId, hotel));
  };

  const handleDeleteRestaurant = (tripId, restaurantId) => {
    dispatch(actions.deleteRest(restaurantId));
    tripService
      .removeRestaurantFromTrip(tripId, restaurantId)
      .then((res) => {});
  };

  const handleDeleteAttraction = (e, tripId, attractionId) => {
    e.preventDefault();
    tripService
      .removeAttractionFromTrip(tripId, attractionId)
      .then((res) => {});
    dispatch(actions.deleteAttratcion(attractionId));
  };

  // getting start and end date from current trip

  const handleNotesSubmit = async (e) => {
    e.preventDefault();
    let newObj = {
      notes: notesValue,
    };
    console.log(newObj, "Inside handle");
    try {
      await tripService.updateTripById(id.id, newObj);
    } catch (e) {
      console.log(e);
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
                  {currentTrip.length &&
                    currentTrip.map((trip) => (
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
                                {`Trip to ${trip.destination}`}
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
                                              removeHotelFromBin(
                                                tripId,
                                                hotel[0].location_id,
                                                hotel[0],
                                              )
                                            }
                                          >
                                            <DeleteIcon />
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
                                        memorial to King George V of England,
                                        who landed in India at the same place in
                                        1911.
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
                      {hotels.map((hotel) => {
                        return (
                          <Grid
                            key={hotel._id}
                            item
                            xs={12}
                            style={{
                              padding: "2rem",
                              paddingTop: "0rem",
                              paddingRight: "2rem",
                            }}
                          >
                            <Card sx={{ width: "100%" }}>
                              <>
                                <CardContent>
                                  <Grid spacing={2} container>
                                    <Grid item xs={1}>
                                      <PlaceIcon />
                                    </Grid>
                                    <Grid item xs={9}>
                                      <Typography
                                        gutterBottom
                                        variant="body1"
                                        fontWeight="600"
                                        component="div"
                                      >
                                        {hotel.name}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                      {/* <Button
                                        style={styles.button}
                                        aria-controls={
                                          open ? "basic-menu" : undefined
                                        }
                                        aria-haspopup="true"
                                        aria-expanded={
                                          open ? "true" : undefined
                                        }
                                        onClick={handleClick}
                                      >
                                        Save
                                        <BookmarkBorderIcon
                                          sx={{ color: "white" }}
                                        />
                                      </Button> */}
                                      {/* <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                          "aria-labelledby": "basic-button",
                                        }}
                                      >
                                        <MenuItem
                                          onClick={() => {
                                            handleClose();
                                            navigate("/createtrip");
                                            document.getElementById(
                                              "app-bar"
                                            ).style.display = "block";
                                          }}
                                        >
                                          <Typography
                                            variant="bidy1"
                                            fontWeight="800"
                                          >
                                            Create A Plan
                                          </Typography>
                                        </MenuItem>

                                        {trips.map((trip, index) => (
                                          <MenuItem key={index + 100}>
                                            <Typography variant="caption">
                                              {`Trip to ${
                                                trip.destination.split(",")[0]
                                              }`}
                                            </Typography>
                                          </MenuItem>
                                        ))}
                                      </Menu> */}
                                      <Grid item xs={12}></Grid>
                                    </Grid>
                                    <Grid container item xs={7}>
                                      <Grid item xs={12}>
                                        {/* <Typography
                                          variant="bode2"
                                          fontWeight={"600"}
                                        >
                                          Country:{" "}
                                        </Typography>
                                        <Typography variant="bode2">
                                          {getCountryName(
                                            hotel.address.countryCode
                                          )}
                                        </Typography> */}
                                        <br />
                                        <br />
                                        <Typography
                                          variant="bode2"
                                          fontWeight={"600"}
                                        >
                                          Amenities:{" "}
                                        </Typography>
                                        {hotel.amenities &&
                                          hotel.amenities.length > 0 &&
                                          hotel.amenities.map(
                                            (amenity, index) => {
                                              return (
                                                <Typography
                                                  variant="bode2"
                                                  key={index}
                                                >
                                                  {amenity
                                                    .split("_")
                                                    .join(" ")
                                                    .toLowerCase()
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    amenity
                                                      .split("_")
                                                      .join(" ")
                                                      .toLowerCase()
                                                      .slice(1)}
                                                  ,{" "}
                                                </Typography>
                                              );
                                            },
                                          )}
                                        <Typography variant="bode2"></Typography>
                                        <br />
                                        <br />
                                        <Typography
                                          variant="bode2"
                                          fontWeight={"600"}
                                        >
                                          Description:{" "}
                                        </Typography>
                                        <Typography variant="bode2">
                                          {`${
                                            hotel.description
                                              ? hotel.description
                                              : "No description available"
                                          }`}
                                        </Typography>
                                        <br />
                                        <br />
                                        <Stack
                                          direction="row"
                                          spacing={2}
                                          sx={{ pt: 2 }}
                                        >
                                          <Rating
                                            name="read-only"
                                            value={
                                              hotel.rating ? hotel.rating : 3
                                            }
                                            readOnly
                                          />
                                        </Stack>
                                      </Grid>
                                    </Grid>
                                    <Grid item xs={5} padding="2rem">
                                      <CardMedia
                                        sx={{ borderRadius: "0.5rem" }}
                                        component="img"
                                        height="140"
                                        // borderRadius="2rem"
                                        image={
                                          hotel.image
                                            ? hotel.image
                                            : `https://tripplannercs554.s3.amazonaws.com/HotelImages/${Math.floor(
                                                Math.random() * 300 + 1,
                                              )}.jpg`
                                        }
                                        alt="green iguana"
                                      />
                                    </Grid>
                                  </Grid>
                                </CardContent>
                              </>
                            </Card>
                          </Grid>
                        );
                      })}
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
                <Typography fontWeight="fontWeightBold">Restaurants</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper className="greyPaper" elevation={0}>
                  <Grid container>
                    {restaurants.length &&
                      restaurants.map(
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
                                    {restaurant.length
                                      ? restaurant[0].name
                                      : "N/a"}
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
                    <Card styles={{ padding: "1.5rem" }}>
                      {attractionState.length &&
                        attractionState.map((attraction, index) => (
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
                                        ></Stack>
                                      </Stack>
                                      <Typography
                                        variant="h6"
                                        component="div"
                                        fontWeight="fontWeightBold"
                                        sx={{ mr: "1rem" }}
                                      >
                                        {attraction.length
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
                                        memorial to King George V of England,
                                        who landed in India at the same place in
                                        1911.
                                      </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={3} md={4} lg={4}>
                                      <CardMedia
                                        component="img"
                                        height="150"
                                        width="50"
                                        image={
                                          attraction && attraction[0].image
                                            ? attraction[0].image
                                            : `https://tripplannercs554.s3.amazonaws.com/AttractionImages/${Math.floor(
                                                Math.random() * 100 + 1,
                                              )}.jpg`
                                        }
                                        alt="green iguana"
                                        style={{
                                          borderRadius: 11,
                                          mr: "2rem",
                                        }}
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
                            {trips.itinerary &&
                              trips.itinerary.length &&
                              trips.itinerary.map((day) => (
                                <Accordion fontWeight="fontWeightBold">
                                  <Accordion defaultExpanded={true}>
                                    <AccordionSummary
                                      style={{ flexDirection: "row-reverse" }}
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
                <form onSubmit={handleNotesSubmit}>
                  <textarea
                    className="note"
                    type="text"
                    name="notes"
                    placeholder="Write or paste anything here:how to get around, tips and tricks"
                    value={notesValue}
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
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Typography variant="h6" align="center" gutterBottom>
            <div id="mapContainer" style={stylesMaps.mapContainer}>
              {currentTrip && coords && (
                <GoogleMapReact
                  bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
                  // defaultCenter={coords}
                  center={coords}
                  defaultZoom={10}
                  margin={[50, 50, 50, 50]}
                  // options={""}
                  options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                  }}
                ></GoogleMapReact>
              )}
            </div>
            <Chat socket={socket} id={id} />
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyTrip;
