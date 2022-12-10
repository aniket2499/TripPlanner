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
  Typography,
  AppBar,
} from "@mui/material";
import { Link } from "react-router-dom";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../firebase/Auth";
import userService from "../services/userService";
import Maps from "./Maps";
import { Container } from "@mui/system";
import AddCircleIcon from "@mui/icons-material/AddCircle";
const array = [1, 2, 3, 4];
const array1 = [1, 2, 3];
function Home() {
  //   const currUser = useContext(AuthContext);
  //   // console.log(currUser);

  //   const getCurrUser = async (id) => {
  //     return await userService.getUserById(id);
  //   };

  //   const addUserToMongo = async (obj) => {
  //     console.log(obj);
  //     await userService.createUser({
  //       _id: obj._id,
  //       displayName: obj.displayName,
  //       email: obj.email,
  //       password: "password",
  //     });
  //   };

  //   if (currUser) {
  //     // let user = getCurrUser(currUser._delegate.uid);
  //     // if (!user) {
  //     addUserToMongo({
  //       _id: currUser._delegate.uid,
  //       displayName: currUser._delegate.displayName,
  //       email: currUser._delegate.email,
  //     });
  //     // }
  //   }

  //   const allRestaurants = useSelector((state) => state.restaurants);
  //   console.log(allRestaurants);

  return (
    <div>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={8} md={8} lg={9}>
            <Box sx={{ pt: "2rem", pb: "2rem" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                On Going And Upcoming Trips
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <Button
              sx={{
                pt: "0.3rem",
                pb: "0.3rem",
                backgroundColor: "primary.main",
                mt: "2.25rem",
                width: "100%",
              }}
            >
              <AddCircleIcon sx={{ color: "white" }} />
              <Typography
                variant="body2"
                fontWeight="fontWeightBold"
                sx={{ color: "white", ml: "0.8rem" }}
              >
                Plan New Trip
              </Typography>
            </Button>
          </Grid>
          <Grid container spacing={5}>
            {array.map((item) => (
              <Grid item xs={3}>
                <Card
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "1rem",
                    mt: "1rem",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image="https://shrm-res.cloudinary.com/image/upload/c_crop,h_705,w_1254,x_0,y_0/w_auto:100,w_1200,q_35,f_auto/v1/Legal%20and%20Compliance/New_York_City2m_b7pxic.jpg"
                    alt="random"
                  />
                  <Card>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "black",
                        ml: "0.5rem",
                        mt: "0.2rem",
                        mb: "0.2rem",
                      }}
                    >
                      Trip To New York
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "black",
                        ml: "0.6rem",
                        mt: "0.2rem",
                        mb: "0.2rem",
                      }}
                    >
                      Dec 8-16, 2022
                    </Typography>
                  </Card>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ mt: "3.9rem" }}>
        <Maps />
      </Container>
      <Container sx={{ mt: "2rem" }}>
        <Grid container>
          <Grid item xs={12} sm={8} md={8} lg={9}>
            <Box sx={{ pt: "2rem", pb: "1rem" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Your Past Trips
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <Button
              sx={{
                pt: "0.3rem",
                pb: "0.3rem",
                backgroundColor: "primary.main",
                mt: "2.25rem",
                width: "100%",
              }}
            >
              <AddCircleIcon sx={{ color: "white" }} />
              <Typography
                variant="body2"
                fontWeight="fontWeightBold"
                sx={{ color: "white", ml: "0.8rem" }}
              >
                Plan New Trip
              </Typography>
            </Button>
          </Grid>
          <Grid container spacing={7}>
            {array1.map((item) => (
              <Grid item xs={3}>
                <Card
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "1rem",
                    mt: "1rem",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image="https://a.travel-assets.com/findyours-php/viewfinder/images/res70/495000/495536-bellagio-casino.jpg"
                    alt="random"
                  />
                  <Card>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "black",
                        ml: "0.5rem",
                        mt: "0.2rem",
                        mb: "0.2rem",
                      }}
                    >
                      Trip To Las Vegas
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "black",
                        ml: "0.6rem",
                        mt: "0.2rem",
                        mb: "0.2rem",
                      }}
                    >
                      Dec 8-16, 2021
                    </Typography>
                  </Card>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={8} md={8} lg={12}>
            <Box sx={{ pt: "4.0rem", pb: "0.7rem" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Explore New Places
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mt: "0.5rem" }}
              >
                Popular Destinations
              </Typography>
            </Box>
            <Grid container spacing={12}>
              {array1.map((item) => (
                <Grid item xs={4}>
                  <Card
                    sx={{
                      width: "350px",
                      height: "200",
                      borderRadius: "1rem",
                      mt: "1rem",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="210"
                      image="https://www.planetware.com/photos-large/USNY/new-york-city-statue-of-liberty.jpg"
                      alt="random"
                    />
                    <Card>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "black",
                          ml: "0.5rem",
                          mt: "0.2rem",
                          mb: "0.2rem",
                        }}
                      >
                        Statue Of Liberty
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "black",
                          ml: "0.6rem",
                          mt: "0.2rem",
                          mb: "0.2rem",
                        }}
                      >
                        The Statue of Liberty Enlightening the World" was a gift
                        of friendship from the people of France to the United
                        States and is recognized as a universal symbol of
                        freedom. The Statue of Liberty was dedicated on October
                        28, 1886.
                      </Typography>
                    </Card>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Grid container sx={{ mt: "3rem", backgroundColor: "#ededed" }}>
        <Grid item xs={12} sm={4} md={4} lg={12}>
          <Box sx={{ pt: "2rem", pb: "1rem" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              About Us
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: "1rem", textAlign: "center" }}
            >
              We are a team of travel enthusiasts who want to make your
              travel-planning process easier. We are here to help you plan your
              next trip and make it a memorable one.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
