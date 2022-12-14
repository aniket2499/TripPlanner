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
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import actions from "../actions";
import hotelsData from "../services/getApiData";
import { useEffect, useState } from "react";
import tripService from "../services/tripService";
import Maps from "./Maps";

const Hotels = () => {
  const allState = useSelector((state) => state);

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedButton, setSavedButton] = React.useState(false);

  // const id = useParams().tripid;
  const id = "63934796bd080530bbdc3111";

  const [open, setOpen] = React.useState(false);
  const [hotel, setHotel] = React.useState({});

  const handleOpen = (hotel) => {
    setOpen(true);
    setHotel(hotel);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await hotelsData.getHotelData("new york city", 1);
        if (data.length === 0) {
          return;
        }
        for (let i = 0; i < data.length; i++) {
          data[i].saved = false;
        }

        dispatch(actions.addUser(id));
        // dispatch(actions.deleteUser());
        console.log(allState);
        console.log(data);
        setHotels(data);
        // dispatch(
        //   actions.addHotel(
        //     1,
        //     "SOHO SUITES",
        //     40,
        //     -73,
        //     "https://tripplannercs554.s3.amazonaws.com/HotelImages/43.jpg",
        //     3,
        //   ),
        // );
        setLoading(false);
      } catch (e) {
        return e;
      }
    }
    fetchData();
  }, []);
  console.log(hotels);
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
                Top Hotels In Your Area
              </Typography>
            </Box>

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
                              {hotel.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              component="div"
                              style={{ paddingTop: "1rem" }}
                            >
                              The gateway was built in 1924, in memorial to King
                              George V of England, who landed in India at the
                              same place in 1911.
                            </Typography>
                            <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
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

                          <Grid item xs={12} sm={3} md={4} lg={5}>
                            <Button
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

                            <CardMedia
                              component="img"
                              height="180"
                              image={hotel.image}
                              alt="green iguana"
                              style={{ borderRadius: 11 }}
                              // adding on click for opening modalForHotel
                              onClick={() => {
                                handleOpen(hotel);
                                setHotel(hotel);
                              }}
                            />
                          </Grid>
                        </Grid>
                      </div>
                      {/* <div style={{ marginTop: "1rem" }}>
                      <Typography variant="body2" fontWeight="fontWeightLight">
                        {" "}
                        Situated at the tip of Apollo’s Blunder in South Mumbai,
                        the Gateway of India is a great place to start your
                        sightseeing in Mumbai. The gateway was built in 1924, in
                        memorial to King George V of England, who landed in
                        India at the same place in 1911. The last British troops
                        also departed through this gateway after Indian
                        Independence in 1948.
                      </Typography>
                    </div> */}
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
              {/* <Typography variant="h4" component="div">
                <Maps />
              </Typography> */}
              {open && (
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
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    );
  }
};

export default Hotels;
