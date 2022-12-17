import React, { useContext, useEffect } from "react";
import SocialSignIn from "./SocialSignIn";
import { doSignOut } from "../firebase/FirebaseFunctions";
import { AuthContext } from "../firebase/Auth";
import {
  doSignInWithEmailAndPassword,
  doPasswordReset,
} from "../firebase/FirebaseFunctions";
import { Button, Grid, TextField, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

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
      marginTop: "5rem",
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

  useEffect(() => {
    doSignOut();
  }, []);
  if (currUser) {
    return navigate("/home");
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
      if (error.message === userNotFound || error.message === invalidPassword) {
        document.getElementById("error").innerHTML =
          "User not Found or Invalid Password!";
        document.getElementById("error").style.color = "red";
      } else {
        alert(error.message);
      }
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const email = document.getElementById("email").value;
      if (email) {
        await doPasswordReset(email);
        document.getElementById("error").innerHTML =
          "Check your email for password reset link";
        document.getElementById("error").style.color = "green";
      } else {
        document.getElementById("error").innerHTML =
          "Please enter your email to reset password";
        document.getElementById("error").style.color = "red";
      }
    } catch (error) {
      if (
        error.message ===
        "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."
      ) {
        document.getElementById("error").innerHTML =
          "User not Found for this Email!";
        document.getElementById("error").style.color = "red";
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="bc-image">
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
            onChange={() => {
              document.getElementById("error").innerHTML = "";
            }}
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
            Sign UP Instead
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
