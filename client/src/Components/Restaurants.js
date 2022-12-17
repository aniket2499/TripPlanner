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
} from "@mui/material";
import DisabledByDefaultTwoToneIcon from "@mui/icons-material/DisabledByDefaultTwoTone";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import actions from "../actions";
import getApiData from "../services/getApiData";
import Maps from "./Maps";
import tripService from "../services/tripService";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

function Restaurants() {
  const dispatch = useDispatch();
  const [restaurantData, setRestaurantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedButton, setSavedButton] = useState(false);
  const [open, setOpen] = useState(false);
  const [rest, setRest] = useState({});
  const trips = useSelector((state) => state.trips);
  const id = "63934796bd080530bbdc3111";
  console.log(trips);

  const handleOpen = (hotel) => {
    setOpen(true);
    setRest(hotel);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const destination = trips[0].destination.split(",")[0];

  useEffect(() => {
    async function getResData() {
      try {
        let data = await getApiData.getRestaurantData(`${destination}`, 1, 4);
        if (data.length === 0) {
          return;
        }
        console.log(data);
        let resData = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].location_id.length != 8) {
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
          };
          resData.push(restaurantObj);
        }
        setRestaurantData(resData);
        setLoading(false);
        console.log(restaurantData);
      } catch (e) {
        console.log(e);
        return e;
      }
    }
    getResData();
  }, []);

  console.log("Restaurants.js");

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={6.5} lg={6.5}>
          <Paper elevation={3}>
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
                            <Button
                              id={restaurant.locationId}
                              onClick={(e) => {
                                if (restaurant.saved === true) {
                                  tripService.addHotelToTrip(id, {
                                    locationId: restaurant.locationId,
                                  });
                                } else {
                                }
                                restaurant.saved = !restaurant.saved;
                                setSavedButton(!savedButton);
                              }}
                            >
                              {restaurant.saved ? (
                                <TurnedInIcon />
                              ) : (
                                <TurnedInNotIcon />
                              )}
                              {restaurant.saved ? (
                                <Typography variant="body2">
                                  Remove From Bin
                                </Typography>
                              ) : (
                                <Typography variant="body2">
                                  Add To Bin
                                </Typography>
                              )}
                            </Button>
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DesktopDatePicker
                                    label="Select Date"
                                    disablePast
                                    inputFormat="MM/DD/YYYY"
                                    value={hotel.startDate}
                                    onSelect={(event) => {
                                      event.preventDefault();
                                    }}
                                    onChange={(newValue) => {
                                      console.log(
                                        "aniket new value" + hotel.startDate,
                                      );
                                      hotel.startDate =
                                        dayjs(newValue).format("MM/DD/YYYY");
                                      setCalendarDate(!calendarDate);
                                      console.log(
                                        "aniket new value after" + hotel.startDate,
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
                                </LocalizationProvider> */}

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
}
export default Restaurants;
