import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import "./chat.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteHotel } from "../reducers/hotelReducer";
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
import { initializeState as initTrip } from "../reducers/tripsReducer";
import axios from "axios";
import { jsPDF } from "jspdf";
// import { Base64 } from "js-base64";

// const base64 = new Base64();
const socket = io.connect("http://localhost:3002");

const MyTrip = () => {
  const currUser = useContext(AuthContext);
  const id = useParams();
  const [itinerary, setItinerary] = useState([]);

  const navigate = useNavigate();

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
  const [hotelState, setHotels] = useState([]);
  const [restaurantState, setRestaurants] = useState([]);
  const [attractionState, setAttractions] = useState([]);

  const [notesValue, setNotesValue] = useState("");
  const dispatch = useDispatch();
  const tripId = useParams().id;
  const hotels = useSelector((state) => state.hotels);
  const restaurants = useSelector((state) => state.restaurants);
  const attractions = useSelector((state) => state.attractions);
  const trips = useSelector((state) => state.trips);
  let currentTrip = trips.filter((trip) => trip._id == tripId);

  const handleDownload = (e) => {
    e.preventDefault();
    const objectForPDF = {
      trip: currentTrip,
      hotels: hotels,
      restaurants: restaurants,
      attractions: attractions,
    };
    console.log("objectForPDF", objectForPDF);
    tripService.createPDF(objectForPDF).then((res) => {
      tripService.fetchPDF().then((res) => {
        const file = new Blob([res.data], { type: "application/pdf" });
        saveAs(file, "trip.pdf");
      });
    });
  };

  let startDate = "";
  let endDate = "";
  // console.log("trips are: " + JSON.stringify(trips));
  if (trips.length !== 0) {
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
      backgroundImage: `url(${"https://st.depositphotos.com/2288675/2455/i/950/depositphotos_24553989-stock-photo-hotel.jpg"})`,
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
                  {currentTrip &&
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

            <Grid container sx={{ mb: "1rem" }}>
              <Grid item xs={6} sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate(`${tripId}/invite`);
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
                  <Typography fontWeight="fontWeightBold">Hotels</Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Paper className="greyPaper" elevation={0}>
                  <Grid container>
                    <Card styles={{ padding: "1.5rem" }}>
                      {hotels &&
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
                                              handleDeleteHotel(
                                                e,
                                                tripId,
                                                hotel._id,
                                                hotel,
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
                                        {hotel.name}
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
                                        image={hotel.image}
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

                    <Card styles={{ padding: "1.5rem" }}>
                      {restaurantState.length > 0 &&
                        restaurantState.map((restaurant, index) => (
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
                                            onClick={() =>
                                              handleDeleteRestaurant(
                                                tripId,
                                                restaurant._id,
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
                                        {restaurant.name}
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
                                        image={restaurant.image}
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
                <Typography fontWeight="fontWeightBold">Attractions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper className="greyPaper" elevation={0}>
                  <Grid container>
                    <Card styles={{ padding: "1.5rem" }}>
                      {attractionState.length > 0 &&
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
                                        >
                                          <Button
                                            color="primary"
                                            onClick={(e) =>
                                              handleDeleteAttraction(
                                                e,
                                                tripId,
                                                attraction._id,
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
                                        {attraction.name}
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
                                        image={attraction.image}
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
                <form onSubmit={handleNotesSubmit}>
                  <textarea
                    class="note"
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
          <Typography variant="h6" component="h2" align="center" gutterBottom>
            <Maps />
            <Chat socket={socket} id={id} />
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyTrip;
