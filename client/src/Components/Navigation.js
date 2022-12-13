import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Autocomplete } from "@react-google-maps/api";
import SearchIcon from "@mui/icons-material/Search";
import SignOutBtn from "./SignOut";
import "../App.css";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import {
  Toolbar,
  AppBar,
  Grid,
  Typography,
  Tabs,
  Tab,
  Button,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";

const Navigation = () => {
  const currentUser = useContext(AuthContext);
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [coords, setCoords] = useState({});
  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    console.log(lat, lng);

    setCoords({ lat, lng });
  };
  const linksArray = ["home", "flights"];
  const navigate = useNavigate();
  const [value, setValue] = useState();

  useEffect(() => {
    console.log("fired");

    console.log(window.location.pathname);
    if (
      window.location.pathname === "/home" ||
      window.location.pathname === "/"
    ) {
      setValue(1);
    } else if (window.location.pathname === "/flights") {
      setValue(2);
    } else {
      setValue(false);
    }
  }, [value, window.location.pathname]);

  return (
    <div>
      <AppBar color="inherit" position="relative">
        <Toolbar>
          <Grid sx={{ placeItems: "center" }} container>
            <Grid item xs={2}></Grid>
            <Grid item xs={5}>
              <Tabs
                indicationColor="inherit"
                textColor="inherit"
                value={value in [0, 1, 2] ? value : false}
                onChange={(e, value) => setValue(value)}
              >
                <Typography>
                  <TravelExploreIcon
                    color="primary"
                    fontSize="large"
                    style={{ marginRight: "3rem", marginTop: "0.4rem" }}
                  />
                </Typography>
                {linksArray.map((link, index) => (
                  <Tab
                    key={index}
                    label={link}
                    onClick={() => {
                      navigate(`/${link}`);
                    }}
                  />
                ))}
              </Tabs>
            </Grid>
            <Grid item xs={2}>
              <Box>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  {/* <TextField
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    style={{
                      width: "100%",
                      marginTop: "0.5rem",
                    }}
                  /> */}

                  <div class="search">
                    <input
                      type="text"
                      class="input-search"
                      placeholder="Type to Search..."
                    />
                  </div>
                </Autocomplete>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box>
                <Button onClick={() => navigate("/account")}>
                  <AccountCircleIcon color="primary" fontSize="large" />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const NavigationNonAuth = () => {
  const linksArray = ["home", "login", "signup"];
  const navigate = useNavigate();
  const [value, setValue] = useState();

  // useEffect(() => {
  //   console.log(window.location.pathname);
  //   if (window.location.pathname === "/home") {
  //     setValue(1);
  //   } else if (window.location.pathname === "/login") {
  //     setValue(2);
  //   } else if (window.location.pathname === "/signup") {
  //     setValue(3);
  //   }
  // }, [value]);

  useEffect(() => {
    console.log("fired");
    console.log(window.location.pathname);
    if (
      window.location.pathname === "/home" ||
      window.location.pathname === "/"
    ) {
      setValue(1);
    } else if (window.location.pathname === "/login") {
      setValue(2);
    } else if (window.location.pathname === "/signup") {
      setValue(3);
    }
    return () => {
      setValue(false);
    };
  }, [value, window.location.pathname]);

  return (
    <div>
      <AppBar color="inherit" position="relative" id="navbar">
        <Toolbar>
          <Grid sx={{ placeItems: "center" }} container>
            <Grid item xs={2}></Grid>
            <Grid item xs={6}>
              <Tabs
                id="navbar-tabs"
                indicationColor="inherit"
                textColor="inherit"
                value={value in [0, 1, 2, 3] ? value : false}
                onChange={(e, value) => setValue(value)}
              >
                <Typography>
                  <TravelExploreIcon
                    color="primary"
                    fontSize="large"
                    style={{ marginRight: "3rem", marginTop: "0.4rem" }}
                  />
                </Typography>
                {linksArray.map((link, index) => (
                  <Tab
                    key={index}
                    label={link}
                    onClick={() => {
                      navigate(`/${link === "home" ? "" : link}`);
                    }}
                  />
                ))}
              </Tabs>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;
