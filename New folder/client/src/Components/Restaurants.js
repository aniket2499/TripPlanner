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
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router";
import DisabledByDefaultTwoToneIcon from "@mui/icons-material/DisabledByDefaultTwoTone";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../firebase/Auth";
import StarIcon from "@mui/icons-material/Star";
import actions from "../actions";
import getApiData from "../services/getApiData";
import { useEffect, useState, useContext } from "react";
import tripService from "../services/tripService";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { addHotel, deleteHotel } from "../reducers/hotelReducer";
import Maps from "./Maps";
import store from "../store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { addRestaurant, deleteRestaurant } from "../reducers/restReducer";
import { initializeState as initHotel } from "../reducers/hotelReducer";
import { initializeState as initRest } from "../reducers/restReducer";
import { initializeState as initAttr } from "../reducers/attractionReducer";
import { initializeState as initTrip } from "../reducers/tripsReducer";
import { useParams } from "react-router";

const Restaurants = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currUser = useContext(AuthContext);
  const [restaurantData, setRestaurantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedButton, setSavedButton] = useState(false);
  const [open, setOpen] = useState(false);
  const [rest, setRest] = useState({});
  const [calendarDate, setCalendarDate] = useState(false);
  let destination = null;
  let rangeStartDate = null;
  let rangeEndDate = null;
  const allState = useSelector((state) => state);
  const trips = useSelector((state) => state.trips);
  const id = useParams().tripid;
  const dateIdMap = [];
  console.log("id", id);

  useEffect(() => {
    console.log("event fired");

    async function fetchData() {
      await dispatch(actions.initializeUser(currUser._delegate.uid));
      await dispatch(initTrip());
      await dispatch(initHotel(id));
      await dispatch(initRest(id));
      await dispatch(initAttr(id));
    }
    fetchData();
  }, []);

  const addRestToBin = (tripId, restaurantId, restaurant, visitDate) => {
    console.log(visitDate);
    dispatch(actions.binRestaurant(tripId, restaurantId));
    dispatch(addRestaurant(tripId, restaurant, visitDate));
  };

  const removeRestFromBin = (tripId, restaurantId, restaurant) => {
    dispatch(actions.unbinRestaurant(tripId, restaurantId));
    dispatch(deleteRestaurant(tripId, restaurantId, restaurant));
  };

  const findRestInTrip = (restaurantId) => {
    let currTrip = trips.find((x) => x._id == id);
    let restaurant = currTrip.restaurants.find((h) => h == restaurantId);
    console.log(restaurant);
    return restaurant ? true : false;
  };

  const handleOpen = (hotel) => {
    setOpen(true);
    setRest(hotel);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log("trips");

  // console.log(trips);
  let index = null;
  if (trips.length !== 0) {
    index = trips.findIndex((x) => x._id === id);
    console.log("index is : " + index);
    destination = trips[index].destination.split(",")[0];
  }

  useEffect(() => {
    async function getResData() {
      if (destination) {
        try {
          let data = await getApiData.getRestaurantData(`${destination}`, 1, 4);
          if (data.length === 0) {
            return;
          }
          let resData = [];
          for (let i = 0; i < trips[index].itinerary.length; i++) {
            for (
              let j = 0;
              j < trips[index].itinerary[i].placesToVisit.length;
              j++
            ) {
              dateIdMap.push({
                id: trips[index].itinerary[i].placesToVisit[j].id,
                date: trips[index].itinerary[i].date,
              });
            }
          }
          for (let i = 0; i < data.length; i++) {
            data[i].saved = false;
            data[i].pickerOpen = false;
            let arr = dateIdMap.find((x) => x.id === data[i].location_id);
            if (arr) {
              data[i].startDate = arr.date;
            } else {
              data[i].startDate = trips[index].tripDate.startDate;
            }
          }
          for (let i = 0; i < data.length; i++) {
            if (data[i].ad_position) {
              continue;
            }
            let restaurantObj = {
              name: data[i].name,
              locationId: data[i].location_id,
              address: data[i].address,
              rating: data[i].rating,
              priceLevel: data[i].price_level,
              latitude: data[i].latitude,
              longitude: data[i].longitude,
              image: data[i].image,
              startDate: data[i].startDate,
            };
            resData.push(restaurantObj);
          }
          setRestaurantData(resData);
          setLoading(false);
          // console.log("restaurantData");
          // console.log(resData);
        } catch (e) {
          console.log(e);
          return e;
        }
      }
    }
    getResData();
  }, [destination]);

  for (let i = 0; i < allState.trips.length; i++) {
    if (allState.trips[i]._id === id) {
      rangeStartDate = allState.trips[i].tripDate.startDate;
    }
  }
  for (let i = 0; i < allState.trips.length; i++) {
    if (allState.trips[i]._id === id) {
      rangeEndDate = allState.trips[i].tripDate.endDate;
    }
  }

  if (loading) {
    return (
      <div style={{ paddingTop: "20rem", paddingLeft: "50%" }}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={6.5} lg={6.5}>
          <Paper elevation={3} paddingTop="6rem">
            <Button
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, mt: "2rem" }}
              onClick={() => {
                navigate(`/my-trips/${id}`);
                document.getElementById("app-bar").style.display = "block";
              }}
            >
              <ArrowBackIcon />
            </Button>
            <Box sx={{ pt: "3rem", pb: "1rem" }}>
              <Typography
                variant="h5"
                component="div"
                fontWeight="fontWeightBold"
              >
                Top Restaurants In Your Area
              </Typography>
            </Box>

            <Card styles={{ padding: "1.5rem" }}>
              {restaurantData &&
                restaurantData.map((restaurant, index) => (
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
                        <Grid container sx={{ mt: "1rem" }}>
                          <Grid item xs={12} sm={9} md={8} lg={7}>
                            <Avatar
                              sx={{ backgroundColor: "primary.main", mr: 2 }}
                            >
                              {index + 1}
                            </Avatar>
                            <Typography
                              variant="h6"
                              component="div"
                              fontWeight="fontWeightBold"
                            >
                              {restaurant.name}
                            </Typography>
                            <Typography
                              variant="body1"
                              component="div"
                              style={{ paddingTop: "1rem" }}
                            >
                              {restaurant.address}
                            </Typography>
                            <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                              {restaurant.rating === "1.0" ? (
                                <StarIcon
                                  sx={{
                                    color: "primary.main",
                                    "&.half": {
                                      color: "yellow",
                                      width: 20,
                                      height: 20,
                                    },
                                  }}
                                />
                              ) : restaurant.rating === "2.0" ? (
                                <div>
                                  <StarIcon
                                    sx={{
                                      color: "primary.main",
                                      "&.half": {
                                        color: "yellow",
                                        width: 20,
                                        height: 20,
                                      },
                                    }}
                                  />
                                  <StarIcon
                                    sx={{
                                      color: "primary.main",
                                      "&.half": {
                                        color: "yellow",
                                        width: 20,
                                        height: 20,
                                      },
                                    }}
                                  />
                                </div>
                              ) : restaurant.rating === "3.0" ? (
                                <div>
                                  <StarIcon
                                    sx={{
                                      color: "primary.main",
                                      "&.half": {
                                        color: "yellow",
                                        width: 20,
                                        height: 20,
                                      },
                                    }}
                                  />
                                  <StarIcon
                                    sx={{
                                      color: "primary.main",
                                      "&.half": {
                                        color: "yellow",
                                        width: 20,
                                        height: 20,
                                      },
                                    }}
                                  />
                                  <StarIcon
                                    sx={{
                                      color: "primary.main",
                                      "&.half": {
                                        color: "yellow",
                                        width: 20,
                                        height: 20,
                                      },
                                    }}
                                  />
                                </div>
                              ) : restaurant.rating === "4.0" ? (
                                <div>
                                  <StarIcon
                                    sx={{
                                      color: "primary.main",
                                      "&.half": {
                                        color: "yellow",
                                        width: 20,
                                        height: 20,
                                      },
                                    }}
                                  />
                                  <StarIcon
                                    sx={{
                                      color: "primary.main",
                                      "&.half": {
                                        color: "yellow",
                                        width: 20,
                                        height: 20,
                                      },
                                    }}
                                  />
                                  <StarIcon
                                    sx={{
                                      color: "primary.main",
                                      "&.half": {
                                        color: "yellow",
                                        width: 20,
                                        height: 20,
                                      },
                                    }}
                                  />
                                  <StarIcon
                                    sx={{
                                      color: "primary.main",
                                      "&.half": {
                                        color: "yellow",
                                        width: 20,
                                        height: 20,
                                      },
                                    }}
                                  />
                                </div>
                              ) : restaurant.rating === "5.0" ? (
                                <div>
                                  <StarIcon
                                    sx={{
                                      color: "primary.main",
                                      "&.half": {
                                        color: "yellow",
                                        width: 20,
                                        height: 20,
                                      },
                                    }}
                                  />
                                  <StarIcon
                                    sx={{
                                      color: "primary.main",
                                      "&.half": {
                                        color: "yellow",
                                        width: 20,
                                        height: 20,
                                      },
                                    }}
                                  />
                                  <StarIcon
                                    sx={{
                                      color: "primary.main",
                                      "&.half": {
                                        color: "yellow",
                                        width: 20,
                                        height: 20,
                                      },
                                    }}
                                  />
                                  <StarIcon
                                    sx={{
                                      color: "primary.main",
                                      "&.half": {
                                        color: "yellow",
                                        width: 20,
                                        height: 20,
                                      },
                                    }}
                                  />
                                  <StarIcon
                                    sx={{
                                      color: "primary.main",
                                      "&.half": {
                                        color: "yellow",
                                        width: 20,
                                        height: 20,
                                      },
                                    }}
                                  />
                                </div>
                              ) : (
                                <div>Ratings Unavailable</div>
                              )}
                            </Stack>
                            {restaurant.priceLevel}
                          </Grid>

                          <Grid item xs={12} sm={3} md={4} lg={5}>
                            {trips &&
                              !findRestInTrip(restaurant.locationId) && (
                                <Button
                                  id={restaurant.locationId}
                                  onClick={() =>
                                    addRestToBin(
                                      id,
                                      restaurant.locationId,
                                      restaurant,
                                    )
                                  }
                                >
                                  <Typography variant="body2">
                                    Add Restaurant
                                  </Typography>
                                  <TurnedInNotIcon />
                                </Button>
                              )}
                            {trips && findRestInTrip(restaurant.locationId) && (
                              <Button
                                id={restaurant.locationId}
                                onClick={() =>
                                  removeRestFromBin(
                                    id,
                                    restaurant.locationId,
                                    restaurant,
                                  )
                                }
                              >
                                <Typography variant="body2">
                                  Remove Restaurant
                                </Typography>
                                <TurnedInIcon />
                              </Button>
                            )}

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DesktopDatePicker
                                label="Select Date"
                                disablePast
                                maxDate={rangeEndDate}
                                minDate={rangeStartDate}
                                inputFormat="MM/DD/YYYY"
                                value={restaurant.startDate}
                                onSelect={(event) => {
                                  event.preventDefault();
                                }}
                                onChange={(newValue) => {
                                  console.log(
                                    "aniket new value" + restaurant.startDate,
                                  );
                                  restaurant.startDate =
                                    dayjs(newValue).format("MM/DD/YYYY");
                                  setCalendarDate(!calendarDate);
                                  console.log(
                                    "aniket new value after" +
                                      restaurant.startDate,
                                  );
                                }}
                                id="startDate"
                                renderInput={(params) => (
                                  <TextField
                                    sx={{ width: "16rem" }}
                                    margin="normal"
                                    {...params}
                                    // onChange={handleStartDateChange}
                                  />
                                )}
                              />
                            </LocalizationProvider>

                            <CardMedia
                              component="img"
                              height="180"
                              image={restaurant.image}
                              alt="green iguana"
                              style={{ borderRadius: 11 }}
                              // adding on click for opening modalForHotel
                              onClick={() => {
                                handleOpen(rest);
                                setRest(restaurant);
                              }}
                            />
                          </Grid>
                        </Grid>
                      </div>
                    </Box>
                  </div>
                ))}
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={5.5} lg={5.5}>
          <Maps />
          <Paper elevation={3}>
            <Box sx={{ p: 2 }}>
              {/* {open && (
                    <div>
                      <Box
                        sx={{
                          position: "absolute",
                          top: "90%",
                          left: "80%",
                          transform: "translate(-61%, -84%)",
                          width: "33rem",
                          height: "20rem",
                          bgcolor: "background.paper",
                          border: "2px solid #000",
                          boxShadow: 24,
                          borderRadius: 2,
                          p: 4,
                        }}
                      >
                        <Grid container sx={{ mt: "0.2rem" }}>
                          <Grid item xs={12} sm={9} md={8} lg={12}>
                            <Typography
                              variant="body2"
                              component="div"
                              fontWeight="fontWeightBold"
                            >
                              {hotel.name}
                            </Typography>
                            <div style={{ marginTop: "0.3rem" }}>
                              <Typography
                                variant="body2"
                                fontWeight="fontWeightLight"
                              >
                                Grand, Indo-Saracenic-style, 26m-tall triumphal
                                stone arch, built on the waterfront in 1924.Situated
                                at the tip of Apollo’s Blunder in South Mumbai, the
                                Gateway of India is a great place to start your
                                sightseeing in Mumbai. The gateway was built in
                                1924, in memorial to King George V of England, who
                                landed in India at the same place in 1911.
                              </Typography>
                            </div>
                            <Grid container sx={{ mt: "0.7rem" }}>
                              <Grid item xs={12} sm={9} md={8} lg={8}>
                                <Button
                                  variant="contained"
                                  id={hotel.dupeId}
                                  onClick={(e) => {
                                    if (hotel.saved === true) {
                                      tripService.addHotelToTrip(id, {
                                        dupeId: hotel.id,
                                      });
                                    } else {
                                    }
                                    hotel.saved = !hotel.saved;
                                    setSavedButton(!savedButton);
                                  }}
                                >
                                  {hotel.saved ? (
                                    <TurnedInIcon />
                                  ) : (
                                    <TurnedInNotIcon />
                                  )}
                                  <Typography variant="body2">
                                    {hotel.saved ? "Remove From Bin" : "Add To Bin"}
                                  </Typography>
                                </Button>
                              </Grid>
                              <Grid item xs={12} sm={9} md={8} lg={4}>
                                <Stack direction="row">
                                  {hotel.rating === 1 ? (
                                    <StarIcon
                                      sx={{
                                        color: "primary.main",
                                        "&.half": {
                                          color: "yellow",
                                          width: 20,
                                          height: 20,
                                        },
                                      }}
                                    />
                                  ) : hotel.rating === 2 ? (
                                    <div>
                                      <StarIcon
                                        sx={{
                                          color: "primary.main",
                                          "&.half": {
                                            color: "yellow",
                                            width: 20,
                                            height: 20,
                                          },
                                        }}
                                      />
                                      <StarIcon
                                        sx={{
                                          color: "primary.main",
                                          "&.half": {
                                            color: "yellow",
                                            width: 20,
                                            height: 20,
                                          },
                                        }}
                                      />
                                    </div>
                                  ) : hotel.rating === 3 ? (
                                    <div>
                                      <StarIcon
                                        sx={{
                                          color: "primary.main",
                                          "&.half": {
                                            color: "yellow",
                                            width: 20,
                                            height: 20,
                                          },
                                        }}
                                      />
                                      <StarIcon
                                        sx={{
                                          color: "primary.main",
                                          "&.half": {
                                            color: "yellow",
                                            width: 20,
                                            height: 20,
                                          },
                                        }}
                                      />
                                      <StarIcon
                                        sx={{
                                          color: "primary.main",
                                          "&.half": {
                                            color: "yellow",
                                            width: 20,
                                            height: 20,
                                          },
                                        }}
                                      />
                                    </div>
                                  ) : hotel.rating === 4 ? (
                                    <div>
                                      <StarIcon
                                        sx={{
                                          color: "primary.main",
                                          "&.half": {
                                            color: "yellow",
                                            width: 20,
                                            height: 20,
                                          },
                                        }}
                                      />
                                      <StarIcon
                                        sx={{
                                          color: "primary.main",
                                          "&.half": {
                                            color: "yellow",
                                            width: 20,
                                            height: 20,
                                          },
                                        }}
                                      />
                                      <StarIcon
                                        sx={{
                                          color: "primary.main",
                                          "&.half": {
                                            color: "yellow",
                                            width: 20,
                                            height: 20,
                                          },
                                        }}
                                      />
                                      <StarIcon
                                        sx={{
                                          color: "primary.main",
                                          "&.half": {
                                            color: "yellow",
                                            width: 20,
                                            height: 20,
                                          },
                                        }}
                                      />
                                    </div>
                                  ) : hotel.rating === 5 ? (
                                    <div>
                                      <StarIcon
                                        sx={{
                                          color: "primary.main",
                                          "&.half": {
                                            color: "yellow",
                                            width: 20,
                                            height: 20,
                                          },
                                        }}
                                      />
                                      <StarIcon
                                        sx={{
                                          color: "primary.main",
                                          "&.half": {
                                            color: "yellow",
                                            width: 20,
                                            height: 20,
                                          },
                                        }}
                                      />
                                      <StarIcon
                                        sx={{
                                          color: "primary.main",
                                          "&.half": {
                                            color: "yellow",
                                            width: 20,
                                            height: 20,
                                          },
                                        }}
                                      />
                                      <StarIcon
                                        sx={{
                                          color: "primary.main",
                                          "&.half": {
                                            color: "yellow",
                                            width: 20,
                                            height: 20,
                                          },
                                        }}
                                      />
                                      <StarIcon
                                        sx={{
                                          color: "primary.main",
                                          "&.half": {
                                            color: "yellow",
                                            width: 20,
                                            height: 20,
                                          },
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <div></div>
                                  )}
                                </Stack>
                              </Grid>
                            </Grid>
                            <Grid style={{ marginTop: "1rem" }}>
                              <Typography
                                variant="body2"
                                fontWeight="fontWeightBold"
                              >
                                Amenities :
                              </Typography>
                              <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
                                {hotel.amenities.map((amenity) => (
                                  <div>
                                    <Typography
                                      variant="body2"
                                      fontWeight="fontWeightLight"
                                    >
                                      {amenity}
                                    </Typography>
                                  </div>
                                ))}
                              </Stack>
                            </Grid>
                            <Grid
                              style={{
                                marginTop: "0.8rem",
                                textAlign: "center",
                              }}
                            >
                              <Button onClick={handleClose}>
                                <DisabledByDefaultTwoToneIcon
                                  sx={{
                                    color: "primary.main",
                                    width: 40,
                                    height: 40,
                                  }}
                                />
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                  )} */}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    );
  }
};
export default Restaurants;
