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

const data = {
  data: [
    {
      chainCode: "OI",
      iataCode: "SXD",
      dupeId: 700118746,
      name: "HOTEL OMEGA - VALBONNE",
      hotelId: "OISXD968",
      geoCode: {
        latitude: 43.61428,
        longitude: 7.05464,
      },
      address: {
        countryCode: "FR",
      },
      distance: {
        value: 0.73,
        unit: "KM",
      },
    },
    {
      chainCode: "DH",
      iataCode: "SCR",
      dupeId: 505001770,
      name: "CHECK SINGLE CIF DHSCRMS8",
      hotelId: "DHSCRMS8",
      geoCode: {
        latitude: 43.62215,
        longitude: 7.04024,
      },
      distance: {
        value: 0.82,
        unit: "KM",
      },
    },
    {
      chainCode: "DH",
      iataCode: "VLI",
      dupeId: 504621595,
      name: "CHECK SINGLE CIF DHVLIMS8",
      hotelId: "DHVLIMS8",
      geoCode: {
        latitude: 43.62215,
        longitude: 7.04024,
      },
      distance: {
        value: 0.82,
        unit: "KM",
      },
    },
    {
      chainCode: "DH",
      iataCode: "AET",
      dupeId: 504621441,
      name: "CHECK SINGLE CIF DHAETMS8",
      hotelId: "DHAETMS8",
      geoCode: {
        latitude: 43.62215,
        longitude: 7.04024,
      },
      address: {
        countryCode: "US",
      },
      distance: {
        value: 0.82,
        unit: "KM",
      },
    },
    {
      chainCode: "DH",
      iataCode: "NYC",
      dupeId: 504621445,
      name: "CHECK SINGLE CIF DHNYCMS8",
      hotelId: "DHNYCMS8",
      geoCode: {
        latitude: 43.62215,
        longitude: 7.04024,
      },
      address: {
        countryCode: "US",
      },
      distance: {
        value: 0.82,
        unit: "KM",
      },
    },
  ],
  meta: {
    count: 5,
    links: {
      self: "http://test.api.amadeus.com/reference-data/locations/hotels/by-geocode?latitude=43.61999752&longitude=7.0499998&radius=1",
    },
  },
};
function Hotels() {
  const [savedButton, setSavedButton] = React.useState(false);

  const buttonForSaved = () => {
    setSavedButton(!savedButton);
  };

  // diving page into 3 sections
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
          <Container>
            <Divider
              style={{
                backgroundColor: "blue",
                paddingTop: 0.5,
                marginTop: 3,
                paddingBottom: 0.5,
              }}
            />
          </Container>
          <Card style={{ padding: "2rem" }}>
            {data.data.map((item) => (
              <Box sx={{ p: 1 }}>
                <div>
                  <Grid container>
                    <Grid item xs={12} sm={9} md={8} lg={7}>
                      <Avatar sx={{ backgroundColor: "primary.main", mr: 2 }}>
                        1
                      </Avatar>

                      <Typography
                        variant="h6"
                        component="div"
                        fontWeight="fontWeightBold"
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="div"
                        style={{ paddingTop: "1rem" }}
                      >
                        Grand, Indo-Saracenic-style, 26m-tall triumphal stone
                        arch, built on the waterfront in 1924.
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} md={4} lg={5}>
                      {savedButton ? (
                        <Button onClick={buttonForSaved}>
                          <TurnedInIcon />
                          <Typography variant="body2">
                            Remove From Bin
                          </Typography>
                        </Button>
                      ) : (
                        <Button onClick={buttonForSaved}>
                          <TurnedInNotIcon />
                          <Typography variant="body2">Add To Bin</Typography>
                        </Button>
                      )}
                      <CardMedia
                        component="img"
                        height="180"
                        image="https://photos.hotelbeds.com/giata/original/07/077710/077710a_hb_ro_027.jpg"
                        alt="green iguana"
                        style={{ borderRadius: 11 }}
                      />
                    </Grid>
                  </Grid>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <Typography variant="body2" fontWeight="fontWeightLight">
                    {" "}
                    Situated at the tip of Apollo’s Blunder in South Mumbai, the
                    Gateway of India is a great place to start your sightseeing
                    in Mumbai. The gateway was built in 1924, in memorial to
                    King George V of England, who landed in India at the same
                    place in 1911. The last British troops also departed through
                    this gateway after Indian Independence in 1948.
                  </Typography>
                </div>
              </Box>
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
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Hotels;
