import { Grid, Card, Button, CardMedia, Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../firebase/Auth";
// import actions from "../actions";
import userService from "../services/userService";
import Maps from "./Maps";
import { Container } from "@mui/system";
import AddCircleIcon from "@mui/icons-material/AddCircle";
const array = [1, 2, 3, 4];
const array1 = [1, 2, 3];
function Home() {
  const navigate = useNavigate();
  const currUser = useContext(AuthContext);
  const dispatch = useDispatch();

  const userId = currUser._delegate.uid;
  let newObj = null;

  const getData = async (id) => {
    try {
      await userService.getUserById(id);
      console.log("Inside Try");
      return;
    } catch (e) {
      console.log("Inside catch");
      let newObj = {
        _id: currUser._delegate.uid,
        displayName: currUser._delegate.displayName,
        email: currUser._delegate.email,
      };
      await userService.createUser({
        _id: newObj._id,
        displayName: newObj.displayName,
        email: newObj.email,
        password: "password",
      });
    }
  };
  getData(userId);
  // const allHotels = useSelector((state) => state.hotels);
  // console.log("allHotels");
  // console.log(allHotels);

  return (
    <div>
      <Container>
        <Grid container sx={{ mt: "3rem" }}>
          <Grid item xs={12} sm={8} md={8} lg={9}>
            <Box sx={{ pb: "2rem" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                On Going And Upcoming Trips
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <Button
              onClick={() => navigate("/createtrip")}
              sx={{
                pt: "0.3rem",
                pb: "0.3rem",
                backgroundColor: "primary.main",
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
              <Grid item xs={6} sm={6} md={4} lg={3}>
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
        <Grid container sx={{ mt: "3rem" }}>
          <Grid item xs={12} sm={8} md={8} lg={9}>
            <Box sx={{ pb: "1rem" }}>
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
              <Grid item xs={6} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "1rem",
                    mt: "1.5rem",
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
        <Grid container sx={{ mt: "2rem" }}>
          <Grid item xs={12} sm={8} md={8} lg={9}>
            <Box sx={{ pb: "1rem" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Explore
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold", mt: "1rem" }}>
                Popular Destinations
              </Typography>
            </Box>
          </Grid>

          <Grid container spacing={7}>
            {array1.map((item) => (
              <Grid item xs={6} sm={6} md={4} lg={3}>
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
                    image="https://www.prettywildworld.com/wp-content/uploads/2017/11/TOP-TOURIST-ATTRACTIONS-IN-THE-USA-FEATURED-PHOTO.jpg"
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
                      Golden Gate Bridge
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
                      Acclaimed as one of the world's most beautiful bridges,
                      there are many different elements to the Golden Gate
                      Bridge that make it unique. With its tremendous towers,
                      sweeping cables, and great span, the Bridge is a sensory
                      beauty and engineering wonder featuring color, sound and
                      light.
                    </Typography>
                  </Card>
                </Card>
              </Grid>
            ))}
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
