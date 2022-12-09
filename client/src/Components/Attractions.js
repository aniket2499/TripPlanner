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
import { useState, useEffect } from "react";
import actions from "../actions";
import attractionsData from "../services/getApiData";

const Attractions = () => {
  const [savedButton, setSavedButton] = useState(false);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        let data = await attractionsData.getAttractionsData("austin", 1, 5.0);
        if (data.length === 0) {
          return;
        }

        setAttractions(data);

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
  if (loading) return <div>Loading...</div>;
  else {
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
                Top Attractions In Your Area
              </Typography>
            </Box>

            <Card style={{ padding: "1.5rem" }}>
              {attractions.map((attraction, index) => (
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
                          {attraction.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          style={{ paddingTop: "1rem" }}
                        >
                          {attraction.description}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3} md={4} lg={5}>
                        {savedButton ? (
                          <Button
                            id={attraction.location_id}
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

                        {attraction.photo?.images?.original?.url ? (
                          <CardMedia
                            component="img"
                            height="180"
                            image={attraction.photo.images.original.url}
                            alt="green iguana"
                            style={{ borderRadius: 11 }}
                          />
                        ) : (
                          <CardMedia
                            component="img"
                            height="180"
                            image="https://www.planetware.com/photos-large/USNY/usa-best-places-new-york.jpg"
                            alt="green iguana"
                            style={{ borderRadius: 11 }}
                          />
                        )}
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

export default Attractions;
