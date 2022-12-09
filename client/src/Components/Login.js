import React, { useContext } from "react";
import SocialSignIn from "./SocialSignIn";

import { AuthContext } from "../firebase/Auth";
import {
  doSignInWithEmailAndPassword,
  doPasswordReset,
} from "../firebase/FirebaseFunctions";
import { Button, Grid, TextField, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { color } from "@mui/system";
import Navigation from "./Navigation";

function Login() {
  const navigate = useNavigate();
  const styles = {
    box: {
      display: "flex",
      flexDirection: "column",
      maxWidth: 450,
      alignItems: "center",
      justifyContent: "center",
      margin: "auto",
      marginTop: "2rem",
      padding: "3rem",
      border: "1px solid #c0c0c0",
      borderRadius: "15px",
      //
    },
    header: {
      padding: "2rem",
      textAlign: "center",
    },
    button: {
      marginTop: "1.5rem",
    },
  };
  const currUser = useContext(AuthContext);
  if (currUser) {
    return navigate("/");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const userNotFound =
      "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).";
    const invalidPassword =
      "Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).";
    const { email, password } = e.target.elements;
    try {
      await doSignInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      // alert(error);
      console.log(error.message);
      if (error.message === userNotFound) {
        document.getElementById("error").innerHTML =
          "User not found. Please sign up";
      } else if (error.message === invalidPassword) {
        document.getElementById("error").innerHTML = "Invalid password";
      }
      // document.getElementById("error").innerHTML = "Invalid email or password";
      // document.getElementById("error").style.color = "red";
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const email = document.getElementById("email").value;
      if (email) {
        await doPasswordReset(email);
        alert("Password reset email sent to " + email);
      } else {
        alert("Please enter your email address before clicling reset password");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <Box
          style={styles.box}
          sx={{
            ":hover": { boxShadow: "10px 10px 20px #ccc" },
            boxShadow: "5px 5px 10px #ccc",
          }}
        >
          <Typography variant="h3" component="h1" style={styles.header}>
            Login
          </Typography>
          <TextField
            margin="normal"
            id="email"
            label="Email"
            type={"email"}
            onChange={() => {
              document.getElementById("error").innerHTML = "";
            }}
            required
          />
          <TextField
            margin="normal"
            id="password"
            label="Password"
            type={"password"}
            autoComplete="off"
            required
          />
          <Typography variant="body2" id="error" color="red"></Typography>
          <Button style={styles.button} variant="contained" type="submit">
            Login
          </Button>
          <SocialSignIn />
          <Button
            style={styles.button}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Change to SignUp
          </Button>
          <Link
            style={{ textDecoration: "none" }}
            onClick={handlePasswordReset}
          >
            Forgot Your Password?
          </Link>
        </Box>
      </form>
    </div>
  );
}

export default Login;
