import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import SignOutBtn from "./SignOut";
import "../App.css";

import {
  Container,
  Button,
  Typography,
  Toolbar,
  AppBar,
  Link,
} from "@mui/material";

const Navigation = () => {
  const currentUser = useContext(AuthContext);
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  return (
    <Container>
      <AppBar position="static" color="inherit">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h4" noWrap component="a" href="/">
              TRAVEL ADVISOR
            </Typography>
            <Link key="home">
              <Typography variant="h6" component="a" href="/">
                Home
              </Typography>
            </Link>
            <Link key="account">
              <Typography variant="h6" component="a" href="/account">
                Account
              </Typography>
            </Link>
            <SignOutBtn />
          </Toolbar>
        </Container>
      </AppBar>
    </Container>
  );
};

const NavigationNonAuth = () => {
  return (
    <AppBar position="static" color="inherit">
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
    </AppBar>
  );
};

export default Navigation;
