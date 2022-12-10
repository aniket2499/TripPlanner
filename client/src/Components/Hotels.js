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
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { Container } from "@mui/system";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import actions from "../actions";
import hotelsData from "../services/getApiData";
import modalForHotel from "../modals/modalForHotel";
import { useEffect, useState } from "react";
const Hotels = () => {
  const dispatch = useDispatch();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedButton, setSavedButton] = React.useState(false);
  const [hotelId, setHotelId] = useState("");
  const [hotelModal, setModalForHotel] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        let data = await hotelsData.getHotelData("new york city", 3);
        if (data.length === 0) {
          return;
        }
        for (let i = 0; i < data.length; i++) {
          data[i].saved = false;
        }

        console.log(data);
        setHotels(data);
        dispatch(
          actions.addHotel(
            1,
            "SOHO SUITES",
            40,
            -73,
            "https://tripplannercs554.s3.amazonaws.com/HotelImages/43.jpg",
            3,
          ),
        );
        setLoading(false);
      } catch (e) {
        return e;
      }
    }
    fetchData();
  }, []);

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

            <Card style={{ padding: "1.5rem" }}>
              {hotels &&
                hotels.map((hotel, index) => (
                  <div key={index}>
                    <Box sx={{ p: 1 }}>
                      <Divider
                        style={{
                          backgroundColor: "blue",
                          paddingTop: 0.5,
                          paddingBottom: 0.5,
                          marginTop: "1rem",
                          marginBottom: "1rem",
                        }}
                      />

                      <div>
                        <Grid container>
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
                              Grand, Indo-Saracenic-style, 26m-tall triumphal
                              stone arch, built on the waterfront in 1924.
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
                              id={hotel.dup_id}
                              onClick={(e) => {
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
                                setModalForHotel(true);
                                setHotelId(hotel.hotelId);
                                console.log(hotel.hotelId);
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
          <Paper elevation={3}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h4" component="div">
                Map
              </Typography>
              <modalForHotel
                open={modalForHotel}
                onClose={() => setModalForHotel(false)}
                hotelId={hotelId}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    );
  }
};

export default Hotels;
