import {
  Grid,
  Card,
  Button,
  CardMedia,
  Box,
  Typography,
  CardActionArea,
  Paper,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../firebase/Auth";
import actions from "../actions";
import GoogleMapReact from "google-map-react";
import userService from "../services/userService";
import tripService from "../services/tripService";
import Maps from "./Maps";
import { Container } from "@mui/system";
import storage from "redux-persist/lib/storage";
import store from "../store";
import { initializeAllTrips, initializeState } from "../reducers/tripsReducer";
import { ExportStaticData } from "../ExploreStaticData";
import RoomSharpIcon from "@mui/icons-material/RoomSharp";

import AddCircleIcon from "@mui/icons-material/AddCircle";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "2rem",
  lineHeight: "60px",
  margin: "0 30px",
  marginTop: "1rem",
  boxShadow: "1 0 1 0",
  backgroundImage: `url(${"./img/travel.jpg"})`,
  // backgroundColor: "#fafafa",
}));

function Home() {
  const trips = useSelector((state) => state.trips);
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
      height: "50vh",
      width: "100%",
    },
    markerContainer: {
      position: "absolute",
      transform: "translate(-50%, -50%)",
      zIndex: 1,
      backgroundColor: "white",
      "&:hover": { zIndex: 2 },
    },
    pointer: {
      cursor: "pointer",
    },
    typography: {
      color: "white",
    },
  };
  const currUser = useContext(AuthContext);
  const userId = currUser._delegate.uid;
  let array1 = [1, 2, 3];
  const navigate = useNavigate();
  const coords = { lat: 38.5, lng: -98.0 };
  const [tripData, setTripData] = useState([]);

  const dispatch = useDispatch();
  // const trips = useSelector((state) => state.trips);

  console.log("+++++");
  console.log(tripData);
  let min = 0;
  let max = 25;
  const one = Math.floor(Math.random() * (max - min) + min);
  const two = Math.floor(Math.random() * (max - min) + min);
  const three = Math.floor(Math.random() * (max - min) + min);

  let arr = [
    ExportStaticData[one],
    ExportStaticData[two],
    ExportStaticData[three],
  ];
  useEffect(() => {
    const getAllTripData = async (userId) => {
      const data = await userService.getUserById(userId);
      const tripArray = data.trips;

      tripArray.forEach(async (id) => {
        const mongoData = await tripService.getTripById(id);
        console.log("mongoData", mongoData);
        setTripData((tripData) => [...tripData, mongoData]);
      });

      let idsArr = [];
      trips.map((tr) => {
        idsArr.push(tr._id);
      });
    };
    getAllTripData(userId);
  }, []);
  console.log(tripData, "====");
  const getData = async (id) => {
    try {
      await userService.getUserById(id);
      return;
    } catch (e) {
      let newObj = {
        _id: currUser._delegate.uid,
        displayName: currUser._delegate.displayName,
        email: currUser._delegate.email,
      };
      await userService.createUserFirebase({
        _id: newObj._id,
        displayName: newObj.displayName,
        email: newObj.email,
        password: "passwordFirebase",
      });
    }
  };
  getData(userId);
  useEffect(() => {
    dispatch(actions.initializeUser(currUser._delegate.uid));
    dispatch(initializeState());
  }, []);
  return (
    <div style={{ paddingTop: "2rem" }}>
      <Container>
        <Grid container sx={{ mt: "3rem" }}>
          <Grid item xs={12} sm={8} md={8} lg={9}>
            <Box sx={{ pb: "2rem" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                On Going And Upcoming Trips
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <Button
              onClick={() => navigate("/createtrip")}
              sx={{
                pt: "0.3rem",
                pb: "0.3rem",
                backgroundColor: "primary.main",
                width: "100%",
              }}
            >
              <AddCircleIcon sx={{ color: "white" }} />
              <Typography
                variant="body2"
                fontWeight="fontWeightBold"
                sx={{ color: "white", ml: "0.8rem" }}
              >
                Plan New Trip
              </Typography>
            </Button>
          </Grid>
          <Grid container spacing={5}>
            {tripData &&
              tripData.map((item, index) => (
                <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                  <CardActionArea
                    onClick={() => navigate(`/my-trips/${item._id}`)}
                  >
                    <Card
                      sx={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "1rem",
                        mt: "1rem",
                      }}
                    >
                      {item.image ? (
                        <CardMedia
                          component="img"
                          height="150"
                          image={item.image}
                          alt="random"
                        />
                      ) : (
                        <CardMedia
                          component="img"
                          height="150"
                          image="https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc5MDg3MjM3MTc5MTAz/panoramic-view-of-lower-manhattan-and-hudson-river-new-york-city-skyline-ny-with-world-trade-towers-at-sunset.jpg"
                          alt="random"
                        />
                      )}

                      <Card>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "black",
                            ml: "0.5rem",
                            mt: "0.2rem",
                            mb: "0.2rem",
                          }}
                        >
                          {`Trip to ${item.destination.split(",")[0]}`}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "black",
                            ml: "0.6rem",
                            mt: "0.2rem",
                            mb: "0.2rem",
                          }}
                        >
                          {`${item.tripDate.startDate} - ${item.tripDate.endDate}`}
                        </Typography>
                      </Card>
                    </Card>
                  </CardActionArea>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ mt: "3.9rem" }}>
        <div id="mapContainer" style={stylesMaps.mapContainer}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
            defaultCenter={coords}
            center={coords}
            defaultZoom={4}
            margin={[50, 50, 50, 50]}
            // options={""}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
            }}
          >
            {tripData.length &&
              tripData.map((place, i) => (
                <div
                  className={stylesMaps.markerContainer}
                  lat={Number(place.destCord.lat)}
                  lng={Number(place.destCord.long)}
                  key={i}
                >
                  <RoomSharpIcon className="xyz" />
                  {/* <Grid item xs={12} style={{ paddingRight: "3rem" }}>
                    
                 
                  </Grid> */}
                  {/* <Paper elevation={3} className={stylesMaps.paper}>
                  
                    {/* <Typography
                      className={stylesMaps.typography}
                      variant="subtitle2"
                      gutterBottom
                    >
                      {place.destination.split(",")[0]}
                    </Typography>
                    <img
                      height="30px"
                      widht="30px"
                      className={stylesMaps.pointer}
                      src={
                        place.image
                          ? place.image
                          : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                      }
                    /> */}
                  {/* </Paper> */}
                </div>
              ))}
          </GoogleMapReact>
        </div>
      </Container>
      <Container sx={{ mt: "2rem" }}>
        <Grid container sx={{ mt: "3rem" }}>
          <Grid item xs={12} sm={8} md={8} lg={9}>
            <Box sx={{ pb: "1rem" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Your Past Trips
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <Button
              onClick={() => navigate("/createtrip")}
              sx={{
                pt: "0.3rem",
                pb: "0.3rem",
                backgroundColor: "primary.main",
                width: "100%",
              }}
            >
              <AddCircleIcon sx={{ color: "white" }} />
              <Typography
                variant="body2"
                fontWeight="fontWeightBold"
                sx={{ color: "white", ml: "0.8rem" }}
              >
                Plan New Trip
              </Typography>
            </Button>
          </Grid>
          <Grid container spacing={7}>
            {array1.map((item, index) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "1rem",
                    mt: "1.5rem",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image="https://a.travel-assets.com/findyours-php/viewfinder/images/res70/495000/495536-bellagio-casino.jpg"
                    alt="random"
                  />
                  <Card>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "black",
                        ml: "0.5rem",
                        mt: "0.2rem",
                        mb: "0.2rem",
                      }}
                    >
                      Trip To Las Vegas
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "black",
                        ml: "0.6rem",
                        mt: "0.2rem",
                        mb: "0.2rem",
                      }}
                    >
                      Dec 8-16, 2021
                    </Typography>
                  </Card>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid container sx={{ mt: "2rem" }}>
          <Grid item xs={12} sm={8} md={8} lg={9}>
            <Box sx={{ pb: "1rem" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Explore
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold", mt: "1rem" }}>
                Popular Destinations
              </Typography>
            </Box>
          </Grid>

          <Grid container spacing={7}>
            {arr.map((item, index) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "1rem",
                    mt: "1rem",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image={item.image}
                    alt="random"
                  />
                  <Card>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "black",
                        ml: "0.5rem",
                        mt: "0.2rem",
                        mb: "0.2rem",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "black",
                        ml: "0.6rem",
                        mt: "0.2rem",
                        mb: "0.2rem",
                      }}
                    >
                      {item.description.slice(0, 320)}
                    </Typography>
                  </Card>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
      <Grid container sx={{ mt: "3rem", backgroundColor: "#ededed" }}>
        <Grid item xs={12} sm={4} md={4} lg={12}>
          <Box sx={{ pt: "2rem", pb: "1rem" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              About Us
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: "1rem", textAlign: "center" }}
            >
              We are a team of travel enthusiasts who want to make your
              travel-planning process easier. We are here to help you plan your
              next trip and make it a memorable one.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
