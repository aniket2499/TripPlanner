import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import {
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  CardMedia,
  Avatar,
  Box,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import "../App.css";
import { Container } from "@mui/system";
import { useTheme, styled } from "@mui/material/styles";

function Flights(props) {
  const theme = props.theme;
  const [flights, setFlights] = useState([]);
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

  return (
    <div>
      <br />
      <Container>
        <Grid container>
          {flights.map((flight) => (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Paper elevation={3} style={{ padding: "10px", margin: "10px" }}>
                <Card variant="outlined">
                  <CardContent>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={2} lg={2}>
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          <img
                            className="FlightLogos"
                            alt="Remy Sharp"
                            src={`imgs/logos/${flight.itineraries[0].segments[0].carrierCode}.png`}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={10}
                        lg={10}
                        justifyContent="center"
                      >
                        <Typography variant="h4">
                          {flight.itineraries[0].segments[0].departure.iataCode}{" "}
                          - {flight.itineraries[0].segments[0].arrival.iataCode}
                        </Typography>
                        <Typography variant="h6" component="div">
                          {
                            flight.itineraries[0].segments[0].departure.at.split(
                              "T",
                            )[1]
                          }{" "}
                          -{" "}
                          {
                            flight.itineraries[0].segments[0].arrival.at.split(
                              "T",
                            )[1]
                          }
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Flights;
