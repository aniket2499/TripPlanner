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
    console.log(e.target.elements);
    const { email, password } = e.target.elements;
    try {
      await doSignInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
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
            variant="outlined"
            placeholder="Email"
            type={"email"}
            required
          />
          <TextField
            margin="normal"
            id="password"
            variant="outlined"
            placeholder="Password"
            type={"password"}
            autoComplete="off"
            required
          />
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
    // <div>
    //   <br />
    //   <Grid
    //     container
    //     spacing={2}
    //     direction="column"
    //     alignItems="center"
    //     justifyContent="center"
    //     style={{ minHeight: "20vh" }}
    //   >
    //     <Grid item xs={3}>
    //       <Typography variant="h4" component="h1" gutterBottom>
    //         Login
    //       </Typography>
    //     </Grid>
    //     <Grid item xs={3}>
    //       <form onSubmit={handleLogin}>
    //         <label>
    //           Email:
    //           <input name="email" id="email" type="email" placeholder="Email" required />
    //         </label>
    //         <br />
    //         <label>
    //           Password:
    //           <input
    //             name="password"
    //             id="password"
    //             type="password"
    //             placeholder="Password"
    //             autoComplete="off"
    //             required
    //           />
    //         </label>
    //         <br />
    //         <button id="submitButton" name="submitButton" type="submit">
    //           LogIn
    //         </button>
    //       </form>
    //     </Grid>
    //     <br />
    //     <SocialSignIn />
    //   </Grid>
    //   <br />
    //   <button
    //     id="forgotPassButton"
    //     name="forgotPassButton"
    //     onClick={handlePasswordReset}
    //   >
    //     Forgot Password
    //   </button>
    // </div>
  );
}

export default Login;
