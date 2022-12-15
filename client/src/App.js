import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navigation from "./Components/Navigation";
import { AuthProvider } from "./firebase/Auth";
// import PrivateRoute from "./Components/PrivateRoute";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  responsiveFontSizes,
} from "@mui/material";

// import ChangePassword from "./Components/ChangePassword";
// import CreateTrip from "./Components/CreateTrip";
// import InviteToTrip from "./Components/InviteToTrip";
// import Maps from "./Components/Maps";
import SignUpInvite from "./Components/SignUpInvite";
import AcceptInvite from "./Components/AcceptInvite";

const Home = lazy(() => import("./Components/Home"));
const Account = lazy(() => import("./Components/Account"));
const Login = lazy(() => import("./Components/Login"));
const SignUp = lazy(() => import("./Components/SignUp"));
const SignOut = lazy(() => import("./Components/SignOut"));
const Flights = lazy(() => import("./Components/Flights"));
const Restaurants = lazy(() => import("./Components/Restaurants"));
const Hotels = lazy(() => import("./Components/Hotels"));
const Attractions = lazy(() => import("./Components/Attractions"));
const MyTrips = lazy(() => import("./Components/MyTrip"));
const Navigation = lazy(() => import("./Components/Navigation"));
const PrivateRoute = lazy(() => import("./Components/PrivateRoute"));
const ChangePassword = lazy(() => import("./Components/ChangePassword"));
const CreateTrip = lazy(() => import("./Components/CreateTrip"));
const InviteToTrip = lazy(() => import("./Components/InviteToTrip"));
const Maps = lazy(() => import("./Components/Maps"));
const Welcome = lazy(() => import("./Components/Welcome"));
const Error = lazy(() => import("./Components/Error"));

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
      primary: "#000000",
      secondary: "#000000",
      disabled: "#000000",
      hint: "#737373",
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
    borderRadius: 15,
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
        backgroundColor: "#ffffff",
        color: "#000000",
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
      backgroundColor: "#ffffff",
      color: "#000000",
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

          <Suspense fallback={<div>Loading...</div>}>
            <div className="App-body">
              <Routes>
                <Route path="/" element={<Welcome />} />

                <Route path="/home" element={<PrivateRoute />}>
                  <Route path="/home" element={<Home />} />
                </Route>

                <Route path="/account" element={<PrivateRoute />}>
                  <Route path="/account" element={<Account />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/:tripId/accept/signup"
                  element={<SignUpInvite />}
                />
                <Route path="/restaurants" element={<PrivateRoute />}></Route>

                <Route path="/signout" element={<PrivateRoute />}>
                  <Route path="/signout" element={<SignOut />} />
                </Route>

                <Route path="/change-password" element={<ChangePassword />} />

                <Route path="/flights" element={<PrivateRoute />}>
                  <Route path="/flights" element={<Flights />} />
                </Route>

                <Route path="/restaurants" element={<PrivateRoute />}>
                  <Route path="/restaurants" element={<Restaurants />} />
                </Route>

                <Route path="/hotels/:tripid" element={<PrivateRoute />}>
                  <Route path="/hotels/:tripid" element={<Hotels />} />
                </Route>

                <Route path="/attractions" element={<PrivateRoute />}>
                  <Route path="/attractions" element={<Attractions />} />
                </Route>

                <Route path="/:tripId/invite" element={<PrivateRoute />}>
                  <Route path="/:tripId/invite" element={<InviteToTrip />} />
                </Route>
                <Route
                  path="/:tripId/accept/:userId"
                  element={<AcceptInvite />}
                />

                <Route path="/maps" element={<PrivateRoute />}>
                  <Route path="/maps" element={<Maps />} />
                </Route>

                <Route path="/createtrip" element={<PrivateRoute />}>
                  <Route path="/createtrip" element={<CreateTrip />} />
                </Route>
                <Route path="/my-trips/:id" element={<PrivateRoute />}>
                  <Route path="/my-trips/:id" element={<MyTrips />} />
                </Route>
                <Route path="*" element={<Error />} />
              </Routes>
            </div>
          </Suspense>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
