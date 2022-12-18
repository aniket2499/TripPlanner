import {
  Grid,
  Paper,
  Card,
  Button,
  CardMedia,
  Box,
  Divider,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";

import React from "react";
import { useState, useEffect } from "react";
import actions from "../actions";
import attractionsData from "../services/getApiData";
import tripService from "../services/tripService";
import StarIcon from "@mui/icons-material/Star";
import Maps from "./Maps";
import DisabledByDefaultTwoToneIcon from "@mui/icons-material/DisabledByDefaultTwoTone";
import { Link } from "react-router-dom";

const id = "63934796bd080530bbdc3111";
const Attractions = () => {
  const [savedButton, setSavedButton] = useState(false);
  const [attractions, setAttractions] = useState([]);
  const [attraction, setAttraction] = useState([]);
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const handleOpen = (attraction) => {
    setOpen(true);
    setAttraction(attraction);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        let data = await attractionsData.getAttractionsData("surat", 1, 5.0);
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

  if (loading) return <div>Loading...</div>;
  else {
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={6.5} lg={6.5}>
          <Paper elevation={3}>
            <Box sx={{ pt: "2rem", pb: "1rem" }}>
              <Typography
                variant="h5"
                component="div"
                fontWeight="fontWeightBold"
              >
                Top Attractions In Your Area
              </Typography>
            </Box>

            <Card sx={{ pl: "1rem", pr: "1rem" }}>
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

                        {attraction.name ? (
                          <Typography
                            variant="h6"
                            component="div"
                            fontWeight="fontWeightBold"
                          >
                            {attraction.name}
                          </Typography>
                        ) : (
                          <Typography
                            variant="h6"
                            component="div"
                            fontWeight="fontWeightBold"
                          >
                            Attraction
                          </Typography>
                        )}
                        {attraction.description ? (
                          <Typography
                            variant="body2"
                            component="div"
                            style={{ paddingTop: "1rem" }}
                          >
                            {attraction.description}
                          </Typography>
                        ) : (
                          <Typography
                            variant="body2"
                            component="div"
                            style={{ paddingTop: "1rem" }}
                          >
                            Grand, Indo-Saracenic-style, 26m-tall triumphal
                            stone arch, built on the waterfront in 1924.Situated
                            at the tip of Apollo’s Blunder in South Mumbai, the
                            Gateway of India is a great place to start your
                            sightseeing in Mumbai
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={3} md={4} lg={5}>
                        <Button
                          id={attraction.location_id}
                          onClick={(e) => {
                            if (attraction.saved === true) {
                              tripService.addAttractionToTrip(id, {
                                attractionId: attraction.id,
                              });
                            } else {
                            }
                            attraction.saved = !attraction.saved;
                            setSavedButton(!savedButton);
                          }}
                        >
                          {attraction.saved ? (
                            <TurnedInIcon />
                          ) : (
                            <TurnedInNotIcon />
                          )}
                          <Typography variant="body2">
                            {attraction.saved
                              ? "Remove From Bin"
                              : "Add To Bin"}
                          </Typography>
                        </Button>

                        {attraction.photo?.images?.original?.url ? (
                          <CardMedia
                            component="img"
                            height="180"
                            image={attraction.photo.images.original.url}
                            alt="green iguana"
                            style={{ borderRadius: 11 }}
                            onClick={() => {
                              handleOpen(attraction);
                              setAttraction(attraction);
                            }}
                          />
                        ) : (
                          <CardMedia
                            component="img"
                            height="180"
                            image="https://www.planetware.com/photos-large/USNY/usa-best-places-new-york.jpg"
                            alt="green iguana"
                            style={{ borderRadius: 11 }}
                            onClick={() => {
                              handleOpen(attraction);
                              setAttraction(attraction);
                            }}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </div>
                </Box>
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
                          {attraction.name}
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
                            sightseeing in Mumbai.
                          </Typography>
                        </div>
                        <Grid container sx={{ mt: "1rem" }}>
                          <Grid item xs={12} sm={9} md={8} lg={6}>
                            <Button
                              variant="contained"
                              id={attraction.dupeId}
                              onClick={(e) => {
                                if (attraction.saved === true) {
                                  tripService.addAttractionToTrip(id, {
                                    dupeId: attraction.id,
                                  });
                                } else {
                                }
                                attraction.saved = !attraction.saved;
                                setSavedButton(!savedButton);
                              }}
                            >
                              {attraction.saved ? (
                                <TurnedInIcon />
                              ) : (
                                <TurnedInNotIcon />
                              )}
                              <Typography variant="body2">
                                {attraction.saved
                                  ? "Remove From Bin"
                                  : "Add To Bin"}
                              </Typography>
                            </Button>
                          </Grid>
                          <Grid item xs={12} sm={9} md={8} lg={6}>
                            {attraction.rating ? (
                              <Stack direction="row">
                                {attraction.rating == 1 ||
                                attraction.rating == 1.5 ? (
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
                                ) : attraction.rating == 2 ||
                                  attraction.rating == 2.5 ? (
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
                                ) : attraction.rating == 3 ||
                                  attraction.rating == 3.5 ? (
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
                                ) : attraction.rating == 4 ||
                                  attraction.rating == 4.5 ? (
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
                                ) : attraction.rating == 5 ? (
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
                            ) : (
                              <Stack direction="row">
                                <Typography variant="body2">
                                  No Ratings Yet
                                </Typography>
                              </Stack>
                            )}
                          </Grid>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={9}
                          md={8}
                          lg={12}
                          sx={{ mt: "0.2rem" }}
                        >
                          <Typography
                            variant="body2"
                            fontWeight="fontWeightBold"
                            style={{
                              display: "inline-block",
                              marginRight: "0.5rem",
                            }}
                          >
                            Address:
                          </Typography>

                          <Typography
                            variant="body2"
                            fontWeight="fontWeightLight"
                            style={{ display: "inline-block" }}
                          >
                            {attraction.address}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={9}
                          md={8}
                          lg={12}
                          sx={{ mb: "0.2rem" }}
                        >
                          <Typography
                            variant="body2"
                            fontWeight="fontWeightBold"
                            style={{
                              display: "inline-block",
                              marginRight: "0.5rem",
                            }}
                          >
                            Subcategory Rankings:
                          </Typography>

                          <Typography
                            variant="body2"
                            fontWeight="fontWeightLight"
                            style={{ display: "inline-block" }}
                          >
                            {attraction.ranking_subcategory}
                          </Typography>
                        </Grid>
                        {attraction.website && (
                          <Grid container sx={{ mt: "0.3rem" }}>
                            <Grid item xs={12} sm={9} md={8} lg={6}>
                              <Typography
                                variant="body2"
                                fontWeight="fontWeightBold"
                              >
                                Website:
                              </Typography>
                              <Stack direction="row" spacing={2}>
                                <div>
                                  <a
                                    href={attraction.website}
                                    target="_blank"
                                    rel="noopener"
                                  >
                                    <Typography
                                      variant="body2"
                                      fontWeight="fontWeightLight"
                                      style={{ display: "inline-block" }}
                                    >
                                      {attraction.website}
                                    </Typography>
                                  </a>
                                </div>
                              </Stack>
                            </Grid>
                          </Grid>
                        )}
                        <Grid
                          style={{
                            marginTop: "0.2rem",
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

export default Attractions;
