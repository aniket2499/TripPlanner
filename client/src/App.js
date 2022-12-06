import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Account from "./Components/Account";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import SignOut from "./Components/SignOut";
import Navigation from "./Components/Navigation";
import { AuthProvider } from "./firebase/Auth";
import PrivateRoute from "./Components/PrivateRoute";
import Flights from "./Components/Flights";
import Restaurants from "./Components/Restaurants";
import Hotels from "./Components/Hotels";
import Attractions from "./Components/Attractions";
import MyTrips from "./Components/MyTrip";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  responsiveFontSizes,
} from "@mui/material";
import ChangePassword from "./Components/ChangePassword";

let theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#d14000",
      light: "#da6633",
      dark: "#922c00",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff5722",
      contrastText: "#1a1919",
      light: "#ff784e",
      dark: "#b23c17",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    text: {
      primary: "rgba(0,0,0,0.87)",
      secondary: "rgba(0,0,0,0.54)",
      disabled: "rgba(0,0,0,0.38)",
      hint: "rgba(0,0,0,0.38)",
    },
    error: {
      main: "#f44336",
      light: "#f6685e",
      dark: "#aa2e25",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ff9800",
      light: "#ffac33",
      dark: "#b26a00",
      contrastText: "rgba(0,0,0,0.87)",
    },
    info: {
      main: "#2196f3",
      light: "#4dabf5",
      dark: "#1769aa",
      contrastText: "#ffffff",
    },
    success: {
      main: "#4caf50",
      light: "#6fbf73",
      dark: "#357a38",
      contrastText: "rgba(0,0,0,0.87)",
    },
    divider: "rgba(0,0,0,0.12)",
  },
  typography: {
    fontFamily: "Source Sans Pro",
    button: {
      fontSize: "1rem",
      fontFamily: "Source Sans Pro",
      fontWeight: 500,
      lineHeight: 1.75,
    },
    fontSize: 15,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    htmlFontSize: 16,
    h1: {
      fontSize: "6.4rem",
      fontWeight: 300,
      lineHeight: 1.17,
      fontFamily: "Source Sans Pro",
    },
    h2: {
      fontSize: "4rem",
      fontFamily: "Source Sans Pro",
      fontWeight: 300,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "3.2rem",
      fontFamily: "Source Sans Pro",
      fontWeight: 400,
      lineHeight: 1.19,
    },
    h4: {
      fontFamily: "Source Sans Pro",
      fontSize: "2.3rem",
      fontWeight: 400,
      lineHeight: 1.24,
    },
    h5: {
      fontFamily: "Source Sans Pro",
      fontSize: "1.6rem",
      fontWeight: 400,
      lineHeight: 1.33,
    },
    h6: {
      fontFamily: "Source Sans Pro",
      fontSize: "1.4rem",
      fontWeight: 500,
      lineHeight: 1.6,
    },
    subtitle1: {
      fontFamily: "Source Sans Pro",
      fontSize: "1.1rem",
      fontWeight: 400,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontFamily: "Source Sans Pro",
      fontSize: "0.9rem",
      fontWeight: 500,
      lineHeight: 1.56,
    },
    body1: {
      fontFamily: "Source Sans Pro",
      fontSize: "1.1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontFamily: "Source Sans Pro",
      fontSize: "0.9rem",
      fontWeight: 400,
      lineHeight: 1.43,
    },
    caption: {
      fontFamily: "Source Sans Pro",
      fontSize: "0.8rem",
      fontWeight: 400,
      lineHeight: 1.66,
    },
    overline: {
      fontFamily: "Source Sans Pro",
      fontSize: "0.8rem",
      fontWeight: 400,
      lineHeight: 2.66,
    },
  },
  spacing: 5,
  shape: {
    borderRadius: 25,
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: "#ffffff",
        color: "#000000",
      },
    },
    MuiButton: {
      root: {
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .1)",
        height: 48,
        padding: "0 30px",
      },
    },
    MuiCard: {
      root: {
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      },
    },
  },
  props: {
    MuiAppBar: {
      color: "inherit",
    },
    MuiTooltip: {
      arrow: true,
    },
    MuiCard: {
      boxShadow: "inherit",
    },
  },
});

theme = responsiveFontSizes(theme);

function App() {
  console.log("App.js");
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="App-header">
            <Navigation />
          </div>
          <div className="App-body">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/account" element={<PrivateRoute />}>
                <Route path="/account" element={<Account />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signout" element={<SignOut />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/flights" element={<Flights />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/attractions" element={<Attractions />} />
              <Route path="/my-trips" element={<MyTrips />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
