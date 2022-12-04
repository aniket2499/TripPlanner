import React, { useContext, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
  const linksArray = ["home", "flights"];
  const navigate = useNavigate();
  const [value, setValue] = useState();

  return (
    <div>
      <AppBar color="inherit" position="relative">
        <Toolbar>
          <Grid sx={{ placeItems: "center" }} container>
            <Grid item xs={2}></Grid>
            <Grid item xs={5}>
              <Tabs
                indicationColor="inherit"
                textColor="#767676"
                value={value}
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
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  style={{ width: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box>
                <Button onClick={()=>navigate('/account')}>
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
  return (
    <div>
      <AppBar color="inherit" position="relative">
        <Toolbar>
          <Grid sx={{ placeItems: "center" }} container>
            <Grid item xs={2}></Grid>
            <Grid item xs={6}>
              <Tabs
                indicationColor="inherit"
                textColor="#767676"
                value={value}
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
                    label={link}
                    onClick={() => {
                      navigate(`/${link}`);
                    }}
                  />
                ))}
              </Tabs>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* <header className="App-header">
        <AppBar position="static" color="inherit">
          <Toolbar>
            <Link to="/" variant="h5" className="appbar-link">
              TRAVEL ADVISOR
            </Link>
            <Link to="/" variant="h5" className="appbar-link">
              Home
            </Link>
            <Link to="/account" variant="h5" className="appbar-link">
              Account
            </Link>
            <SignOutBtn />
          </Toolbar>
        </AppBar>
      </header> */}
      {/* <AppBar position="static" color="inherit">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h4" noWrap component="a" href="/">
              TRAVEL ADVISOR
            </Typography>
            <Button key="home" sx={{ color: "#fff" }}>
              <Typography variant="h6" component="a" href="/">
                Home
              </Typography>
            </Button>
            <Button key="signup" sx={{ color: "#fff" }}>
              <Typography variant="h6" component="a" href="/signup">
                Sign-up
              </Typography>
            </Button>
            <Button key="login" sx={{ color: "#fff" }}>
              <Typography variant="h6" component="a" href="/login">
                Login
              </Typography>
            </Button>
          </Toolbar>
        </Container>
      </AppBar> */}
    </div>
  );
};

export default Navigation;
