import React, { useContext } from "react";
import SocialSignIn from "./SocialSignIn";
import { Navigate } from "react-router";
import { AuthContext } from "../firebase/Auth";
import {
  doSignInWithEmailAndPassword,
  doPasswordReset,
} from "../firebase/FirebaseFunctions";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import "../App.css";

function Login() {
  const currUser = useContext(AuthContext);
  if (currUser) {
    return <Navigate to="/" />;
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
      if(email){
        await doPasswordReset(email);
        alert("Password reset email sent to " + email);
      }else{
        alert("Please enter your email address before clicling reset password");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <br />
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "20vh" }}
      >
        <Grid item xs={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <form onSubmit={handleLogin}>
            <label>
              Email:
              <input name="email" id="email" type="email" placeholder="Email" required />
            </label>
            <br />
            <label>
              Password:
              <input
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                autoComplete="off"
                required
              />
            </label>
            <br />
            <button id="submitButton" name="submitButton" type="submit">
              LogIn
            </button>
          </form>
        </Grid>
        <br />
        <SocialSignIn />
      </Grid>
      <br />
      <button
        id="forgotPassButton"
        name="forgotPassButton"
        onClick={handlePasswordReset}
      >
        Forgot Password
      </button>
    </div>
  );
}

export default Login;
