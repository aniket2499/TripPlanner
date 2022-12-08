import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../firebase/FirebaseFunctions";
import { AuthContext } from "../firebase/Auth";
import {
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  CardMedia,
  Box,
  Divider,
  Icon,
  Stack,
  ListItem,
  List,
  InputLabel,
  FormHelperText,
  Autocomplete,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import SocialSignIn from "./SocialSignIn";
import userService from "../services/userService";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  responsiveFontSizes,
} from "@mui/material";
import CustomTheme from "./CustomTheme";
import "../App.css";

let theme = responsiveFontSizes(CustomTheme);

function SignUp() {
  const currUser = useContext(AuthContext);
  const [pswdMatch, setPswdMatch] = useState("");
  const [finalPswd, setFinalPswd] = useState("");
  const [userDispName, setUserDispName] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { displayName, email, pwd1, pwd2 } = e.target.elements;
    if (pwd1.value !== pwd2.value) {
      setPswdMatch("Passwords do not match");
      return false;
    } else {
      try {
        setFinalPswd(pwd1.value);
        setUserDispName(displayName.value);
        await doCreateUserWithEmailAndPassword(
          email.value,
          pwd1.value,
          displayName.value,
        );
      } catch (error) {
        alert(error);
      }
    }
  };

  const addToMongo = async (obj) => {
    await userService.createUser({
      _id: obj._id,
      displayName: obj.displayName,
      email: obj.email,
      password: obj.password,
    });
  };

  if (currUser) {
    addToMongo({
      _id: currUser._delegate.uid,
      displayName: userDispName,
      email: currUser._delegate.email,
      password: finalPswd,
    });
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <br />
      <ThemeProvider theme={theme}>
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "20vh" }}
        >
          <Grid item xs={3}>
            <Typography variant="h4" component="h1" gutterBottom>
              Sign Up
            </Typography>
          </Grid>
          <Paper
            elevation={3}
            style={{ padding: "10px", margin: "10px" }}
            display="flex"
            justifyContent="center"
          >
            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ m: 3 }}>
              Trip Type
            </FormLabel>
            <Grid item xs={3}>
              {pswdMatch && <h4 className="error">{pswdMatch}</h4>}
              <form onSubmit={handleSignUp}>
                <label>
                  Name:
                  <input
                    name="displayName"
                    type="text"
                    placeholder="Name"
                    required
                  />
                </label>
                <br />
                <label>
                  Email:
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </label>
                <br />
                <label>
                  Password:
                  <input
                    name="pwd1"
                    id="pwd1"
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                    required
                  />
                </label>
                <br />
                <label>
                  Confirm Password:
                  <input
                    name="pwd2"
                    id="pwd2"
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                    required
                  />
                </label>
                <br />
                <button id="submitButton" name="submitButton" type="submit">
                  Sign Up
                </button>
              </form>
            </Grid>
            <br />
            <SocialSignIn />
          </Paper>
        </Grid>
        <br />
      </ThemeProvider>
    </div>
  );
}

export default SignUp;
