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
import actions from "../actions";
import hotelsData from "../services/getApiData";

import { useEffect, useState } from "react";
const Hotels = () => {
  const dispatch = useDispatch();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedButton, setSavedButton] = React.useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        let data = await hotelsData.getHotelData("mumbai", 1);
        if (data.length === 0) {
          return;
        }
        console.log(`result is ${data}`);
        setHotels(data);
        setLoading(false);
      } catch (e) {
        return e;
      }
    }
    fetchData();
  }, []);

  const buttonForSaved = () => {
    setSavedButton(!savedButton);
  };

  // diving page into 3 sections
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
              {hotels.map((hotel, index) => (
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
                          <Button
                            id={hotelsData.dupeId}
                            onClick={buttonForSaved}
                          >
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
                      Situated at the tip of Apollo’s Blunder in South Mumbai,
                      the Gateway of India is a great place to start your
                      sightseeing in Mumbai. The gateway was built in 1924, in
                      memorial to King George V of England, who landed in India
                      at the same place in 1911. The last British troops also
                      departed through this gateway after Indian Independence in
                      1948.
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
};

export default Hotels;
