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

const data = [
  {
    chainCode: "HI",
    iataCode: "NYC",
    dupeId: 700886598,
    name: "HOLIDAY INN NEVINS STATION",
    hotelId: "HINYCB36",
    geoCode: { latitude: 40.68739, longitude: -73.98265 },
    address: { countryCode: "US" },
    distance: { value: 0.69, unit: "MILE" },
    amenities: ["SWIMMING_POOL"],
    rating: 3,
    lastUpdate: "2022-11-29T06:00:33",
    image: "https://tripplannercs554.s3.amazonaws.com/HotelImages/135.jpg",
  },
  {
    chainCode: "CI",
    iataCode: "JFK",
    dupeId: 700052456,
    name: "COMFORT INN BROOKLYN - DOWNTOWN",
    hotelId: "CIJFK295",
    geoCode: { latitude: 40.68142, longitude: -73.98457 },
    address: { countryCode: "US" },
    distance: { value: 0.72, unit: "MILE" },
    amenities: ["SWIMMING_POOL"],
    rating: 3,
    image: "https://tripplannercs554.s3.amazonaws.com/HotelImages/91.jpg",
  },
  {
    chainCode: "SI",
    iataCode: "NYC",
    dupeId: 700141751,
    name: "SHERATON BROOKLYN NEW YORK HTL",
    hotelId: "SINYC727",
    geoCode: { latitude: 40.6916, longitude: -73.98438 },
    address: { countryCode: "US" },
    distance: { value: 0.92, unit: "MILE" },
    amenities: ["SWIMMING_POOL", "FITNESS_CENTER"],
    rating: 5,
    lastUpdate: "2022-11-29T09:06:47",
    image: "https://tripplannercs554.s3.amazonaws.com/HotelImages/108.jpg",
  },
  {
    chainCode: "BW",
    iataCode: "NYC",
    dupeId: 700144928,
    name: "BW PLUS PROSPECT PARK",
    hotelId: "BWNYC147",
    geoCode: { latitude: 40.66025, longitude: -73.99834 },
    address: { countryCode: "US" },
    distance: { value: 2.13, unit: "MILE" },
    amenities: ["FITNESS_CENTER"],
    rating: 3,
    image: "https://tripplannercs554.s3.amazonaws.com/HotelImages/90.jpg",
  },
  {
    chainCode: "CI",
    iataCode: "NYC",
    dupeId: 700217608,
    name: "COMFORT INN NEAR FINANCIAL DISTRICT",
    hotelId: "CINYC551",
    geoCode: { latitude: 40.71222, longitude: -73.99269 },
    address: { countryCode: "US" },
    distance: { value: 2.32, unit: "MILE" },
    amenities: ["FITNESS_CENTER"],
    rating: 3,
    image: "https://tripplannercs554.s3.amazonaws.com/HotelImages/131.jpg",
  },
  {
    chainCode: "FN",
    iataCode: "NYC",
    dupeId: 700222829,
    name: "FAIRFIELD INN FINANCL MARRIOTT",
    hotelId: "FNNYCLMF",
    geoCode: { latitude: 40.70604, longitude: -74.00502 },
    address: { countryCode: "US" },
    distance: { value: 2.4, unit: "MILE" },
    amenities: ["FITNESS_CENTER"],
    rating: 3,
    image: "https://tripplannercs554.s3.amazonaws.com/HotelImages/158.jpg",
  },
  {
    chainCode: "HX",
    iataCode: "NYC",
    dupeId: 700051862,
    name: "HAMPTON INN MANHATTAN SEAPORT",
    hotelId: "HXNYC320",
    geoCode: { latitude: 40.70906, longitude: -74.00199 },
    address: { countryCode: "US" },
    distance: { value: 2.43, unit: "MILE" },
    amenities: ["FITNESS_CENTER"],
    rating: 3,
    lastUpdate: "2022-11-29T06:04:22",
    image: "https://tripplannercs554.s3.amazonaws.com/HotelImages/218.jpg",
  },
  {
    chainCode: "HY",
    iataCode: "NYC",
    dupeId: 700124950,
    name: "ANDAZ WALL STREET-A CONCEPT BY HYATT",
    hotelId: "HYNYCAWS",
    geoCode: { latitude: 40.70541, longitude: -74.00783 },
    address: { countryCode: "US" },
    distance: { value: 2.48, unit: "MILE" },
    amenities: ["SPA", "FITNESS_CENTER"],
    rating: 4,
    lastUpdate: "2022-11-29T06:04:34",
    image: "https://tripplannercs554.s3.amazonaws.com/HotelImages/296.jpg",
  },
  {
    chainCode: "TM",
    iataCode: "NYC",
    dupeId: 700018235,
    name: "GILD HALL - A THOMPSON HOTEL",
    hotelId: "TMNYCC8F",
    geoCode: { latitude: 40.70788, longitude: -74.00712 },
    address: { countryCode: "US" },
    distance: { value: 2.56, unit: "MILE" },
    amenities: ["FITNESS_CENTER"],
    rating: 5,
    lastUpdate: "2022-11-29T09:06:41",
    image: "https://tripplannercs554.s3.amazonaws.com/HotelImages/182.jpg",
  },
  {
    chainCode: "DT",
    iataCode: "NYC",
    dupeId: 700146224,
    name: "DOUBLETREE BY HILTON NYC FINANCIAL",
    hotelId: "DTNYC917",
    geoCode: { latitude: 40.70405, longitude: -74.01259 },
    address: { countryCode: "US" },
    distance: { value: 2.63, unit: "MILE" },
    amenities: ["FITNESS_CENTER"],
    rating: 4,
    image: "https://tripplannercs554.s3.amazonaws.com/HotelImages/149.jpg",
  },
];
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

          <Card style={{ padding: "1.5rem" }}>
            {data.map((hotel, index) => (
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
                      <Avatar sx={{ backgroundColor: "primary.main", mr: 2 }}>
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
                        Grand, Indo-Saracenic-style, 26m-tall triumphal stone
                        arch, built on the waterfront in 1924.
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} md={4} lg={5}>
                      {savedButton ? (
                        <Button id={hotel.dupeId} onClick={buttonForSaved}>
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
                        image={hotel.image}
                        alt="green iguana"
                        style={{ borderRadius: 11 }}
                        onClick={hotel.image}
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
