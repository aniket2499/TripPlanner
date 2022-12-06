import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
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
} from "@mui/material";
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

function Flights(props) {
  const [flights, setFlights] = useState([]);
  const [formParms, setFormParms] = useState({});
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        // const response = await fetch("/api/flights");
        // const json = await response.json();
        let flights = [
          {
            type: "flight-offer",
            id: "1",
            oneWay: false,
            lastTicketingDate: "2021-11-01",
            numberOfBookableSeats: 9,
            itineraries: [
              {
                duration: "PT14H15M",
                segments: [
                  {
                    departure: {
                      iataCode: "SYD",
                      terminal: "1",
                      at: "2021-11-01T11:35:00",
                    },
                    arrival: {
                      iataCode: "MNL",
                      terminal: "2",
                      at: "2021-11-01T16:50:00",
                    },
                    carrierCode: "PR",
                    duration: "PT8H15M",
                    id: "1",
                  },
                  {
                    departure: {
                      iataCode: "MNL",
                      terminal: "1",
                      at: "2021-11-01T19:20:00",
                    },
                    arrival: {
                      iataCode: "BKK",
                      at: "2021-11-01T21:50:00",
                    },
                    carrierCode: "PR",
                    duration: "PT3H30M",
                    id: "2",
                  },
                ],
              },
            ],
            price: {
              currency: "EUR",
              grandTotal: "355.34",
            },
            pricingOptions: {
              fareType: ["PUBLISHED"],
              includedCheckedBagsOnly: true,
            },
            travelerPricings: [
              {
                travelerId: "1",
                fareOption: "STANDARD",
                travelerType: "ADULT",
                price: {
                  currency: "EUR",
                  total: "355.34",
                  base: "255.00",
                },
                fareDetailsBySegment: [
                  {
                    segmentId: "1",
                    cabin: "ECONOMY",
                    fareBasis: "EOBAU",
                    class: "E",
                    includedCheckedBags: {
                      weight: 25,
                      weightUnit: "KG",
                    },
                  },
                  {
                    segmentId: "2",
                    cabin: "ECONOMY",
                    fareBasis: "EOBAU",
                    class: "E",
                    includedCheckedBags: {
                      weight: 25,
                      weightUnit: "KG",
                    },
                  },
                ],
              },
            ],
          },
          {
            type: "flight-offer",
            id: "2",
            oneWay: false,
            lastTicketingDate: "2021-11-01",
            numberOfBookableSeats: 9,
            itineraries: [
              {
                duration: "PT16H35M",
                segments: [
                  {
                    departure: {
                      iataCode: "SYD",
                      terminal: "1",
                      at: "2021-11-01T11:35:00",
                    },
                    arrival: {
                      iataCode: "MNL",
                      terminal: "2",
                      at: "2021-11-01T16:50:00",
                    },
                    carrierCode: "PR",
                    duration: "PT8H15M",
                    id: "3",
                    numberOfStops: 0,
                    blacklistedInEU: false,
                  },
                  {
                    departure: {
                      iataCode: "MNL",
                      terminal: "1",
                      at: "2021-11-01T21:40:00",
                    },
                    arrival: {
                      iataCode: "BKK",
                      at: "2021-11-02T00:10:00",
                    },
                    carrierCode: "PR",
                    number: "740",
                    aircraft: {
                      code: "321",
                    },
                    operating: {
                      carrierCode: "PR",
                    },
                    duration: "PT3H30M",
                    id: "4",
                    numberOfStops: 0,
                    blacklistedInEU: false,
                  },
                ],
              },
            ],
            price: {
              currency: "EUR",
              grandTotal: "355.34",
            },
            pricingOptions: {
              fareType: ["PUBLISHED"],
              includedCheckedBagsOnly: true,
            },
            travelerPricings: [
              {
                travelerId: "1",
                fareOption: "STANDARD",
                travelerType: "ADULT",
                price: {
                  currency: "EUR",
                  total: "355.34",
                  base: "255.00",
                },
                fareDetailsBySegment: [
                  {
                    segmentId: "3",
                    cabin: "ECONOMY",
                    fareBasis: "EOBAU",
                    class: "E",
                    includedCheckedBags: {
                      weight: 25,
                      weightUnit: "KG",
                    },
                  },
                  {
                    segmentId: "4",
                    cabin: "ECONOMY",
                    fareBasis: "EOBAU",
                    class: "E",
                    includedCheckedBags: {
                      weight: 25,
                      weightUnit: "KG",
                    },
                  },
                ],
              },
            ],
          },
        ];

        setFlights(flights);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  // calling route to get flights from server
  const handleSearch = (formParms) => {
    setFormParms(formParms);
    setIndex(0);
  };

  return (
    <div>
      <br />
      <Container>
        <SearchFlightForm handleSearch={handleSearch}></SearchFlightForm>
        <br />

        {loading ? (
          <CircularProgress varient="indeterminate" value={100} />
        ) : (
          <div>
            {flights.map((flight) => (
              <Paper
                elevation={3}
                style={{ padding: "10px", margin: "10px" }}
                className="flightsDetailsCard"
                display="flex"
                justifyContent="center"
              >
                <Card variant="outlined">
                  <CardContent>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={8} lg={8}>
                        <List>
                          {flight.itineraries[0].segments.map(
                            (segment, index) => (
                              <div>
                                <ListItem>
                                  <Grid container>
                                    <Grid item xs={12} sm={12} md={2} lg={2}>
                                      <Grid
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                        sx={{
                                          mt: 7,
                                          mb: 3.5,
                                          mr: 3,
                                          maxHeight: 100,
                                        }}
                                      >
                                        <img
                                          className="FlightLogos"
                                          alt="Remy Sharp"
                                          src={`imgs/logos/${segment.carrierCode}.png`}
                                          style={{
                                            width: "70%",
                                            maxWidth: "70px",
                                          }}
                                        />
                                      </Grid>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={12}
                                      sm={12}
                                      md={10}
                                      lg={8}
                                      justifyContent="center"
                                    >
                                      <Typography
                                        variant="h4"
                                        sx={{ m: 0.5 }}
                                        color="primary.main"
                                      >
                                        {segment.departure.iataCode} -{" "}
                                        {segment.arrival.iataCode}
                                      </Typography>
                                      <Stack direction="row">
                                        <FlightTakeoffTwoToneIcon
                                          sx={{
                                            mt: 1,
                                            mb: 0,
                                            mr: 1,
                                            ml: 0,
                                          }}
                                        >
                                          {" "}
                                        </FlightTakeoffTwoToneIcon>
                                        <Typography
                                          variant="subtitle1"
                                          component="div"
                                          color="text.secondary"
                                          sx={{ p: 0.5 }}
                                        >
                                          {segment.departure.at.split("T")[0]}{" "}
                                        </Typography>
                                        <FlightLandTwoToneIcon
                                          sx={{
                                            mt: 1,
                                            mb: 0,
                                            mr: 1,
                                            ml: 14.5,
                                          }}
                                        ></FlightLandTwoToneIcon>
                                        <Typography
                                          variant="subtitle1"
                                          component="div"
                                          color="text.secondary"
                                          sx={{ p: 0.5 }}
                                        >
                                          {segment.arrival.at.split("T")[0]}
                                        </Typography>
                                      </Stack>
                                      <Stack direction="row">
                                        <CalendarMonthIcon
                                          data-testid="CalendarMonth"
                                          sx={{ m: 0.5 }}
                                        ></CalendarMonthIcon>
                                        <Typography
                                          variant="subtitle1"
                                          component="div"
                                          color="text.secondary"
                                          sx={{ p: 0.5 }}
                                        >
                                          {segment.departure.at.split("T")[1]} -{" "}
                                          {segment.arrival.at.split("T")[1]}
                                        </Typography>

                                        <AccessTimeTwoToneIcon
                                          data-testid="CalendarMonth"
                                          sx={{ ml: 2.5, mt: 0.5, mr: 1 }}
                                        ></AccessTimeTwoToneIcon>

                                        <Typography
                                          variant="subtitle1"
                                          component="div"
                                          color="text.secondary"
                                          sx={{ p: 0.5 }}
                                        >
                                          {
                                            segment.duration
                                              .split("PT")[1]
                                              .split("H")[0]
                                          }
                                          h{" "}
                                          {
                                            segment.duration
                                              .split("PT")[1]
                                              .split("H")[1]
                                              .split("M")[0]
                                          }
                                          m
                                        </Typography>
                                      </Stack>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      lg={2}
                                      justifyContent="center"
                                    ></Grid>
                                  </Grid>
                                </ListItem>
                                {index <
                                flight.itineraries[0].segments.length - 1 ? (
                                  <Divider></Divider>
                                ) : null}
                                {index <
                                flight.itineraries[0].segments.length - 1
                                  ? () => {
                                      index = index + 1;
                                    }
                                  : () => {
                                      console.log(index + 1);
                                    }}
                              </div>
                            ),
                          )}
                        </List>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={4}
                        justify="center"
                        display="flex"
                      >
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ mr: 12, ml: 12 }}
                        >
                          <Stack direction="column">
                            <Stack direction="row">
                              <AttachMoneyTwoToneIcon
                                style={{
                                  color: "rgba(0,0,0,0.54)",
                                  fontSize: "3.2rem",
                                  fontFamily: "Source Sans Pro",
                                  fontWeight: 400,
                                  lineHeight: 1.19,
                                  letterSpacing: "0.00735em",
                                }}
                                sx={{ mt: 3, mb: 2, pr: 0 }}
                                justifyContent="center"
                              ></AttachMoneyTwoToneIcon>
                              <Typography
                                variant="h3"
                                sx={{ mt: 2, mb: 2, mr: 0, ml: 0 }}
                                color="primary.main"
                              >
                                {flight.price.grandTotal}
                              </Typography>
                            </Stack>
                            <Stack
                              direction="row"
                              sx={{ mt: 0, mb: 0, mr: 2, ml: 2 }}
                            >
                              {flight.pricingOptions.includedCheckedBagsOnly ===
                              true ? (
                                <LuggageTwoToneIcon></LuggageTwoToneIcon>
                              ) : (
                                <NoLuggageTwoToneIcon></NoLuggageTwoToneIcon>
                              )}
                              <Typography
                                variant="body1"
                                sx={{ mt: 0, mb: 0, mr: 2, ml: 1 }}
                                color="text.hint"
                              >
                                Chekin Bag{"  "}
                              </Typography>

                              <AirlineSeatLegroomNormalTwoToneIcon
                                sx={{ mt: 0, mb: 0, mr: 0, ml: 2 }}
                              ></AirlineSeatLegroomNormalTwoToneIcon>
                              <Typography
                                variant="body1"
                                sx={{ mt: 0, mb: 0, mr: 2, ml: 1 }}
                                color="text.hint"
                              >
                                {flight.numberOfBookableSeats}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Paper>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Flights;
//added by me
