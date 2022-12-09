import React, { useState, useContext } from "react";
import { doCreateUserWithEmailAndPassword } from "../firebase/FirebaseFunctions";
import { AuthContext } from "../firebase/Auth";
import { doSignOut } from "../firebase/FirebaseFunctions";
import userService from "../services/userService";
import "../App.css";
import { Box } from "@mui/system";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  FormLabel,
} from "@mui/material";
import SocialSignIn from "./SocialSignIn";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const currUser = useContext(AuthContext);
  const [pswdMatch, setPswdMatch] = useState("");
  const [finalPswd, setFinalPswd] = useState("");
  const [userDispName, setUserDispName] = useState("");
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
      padding: "1rem",
      textAlign: "center",
    },
    button: {
      marginTop: "1rem",
    },
  };

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
        alert("Account created successfully");
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
    doSignOut();
    navigate("/login");
  };

  const handlePasswordMatch = () => {
    if (
      document.getElementById("pwd1").value ===
      document.getElementById("pwd2").value
    ) {
      document.getElementById("pwd2").innerHTML = "";
    } else {
      document.getElementById("pwd2").innerHTML = "Passwords do not match";
    }
  };

  if (currUser) {
    addToMongo({
      _id: currUser._delegate.uid,
      displayName: userDispName,
      email: currUser._delegate.email,
      password: finalPswd,
    });
    console.log(currUser);
    // return <Navigate to="/home" />;
  }

  return (
    <div>
      <form onSubmit={handleSignUp} autoComplete="off">
        <Box
          style={styles.box}
          sx={{
            ":hover": { boxShadow: "10px 10px 20px #ccc" },
            boxShadow: "5px 5px 10px #ccc",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            style={styles.header}
            gutterBottom
          >
            Sign Up
          </Typography>
          <TextField
            margin="normal"
            id="displayName"
            label="Name"
            type={"text"}
            required
          />
          <TextField
            margin="normal"
            id="email"
            label="Email"
            type={"email"}
            autoComplete="new-password"
            required
          />
          <TextField
            margin="normal"
            id="pwd1"
            label="Password"
            type={"password"}
            autoComplete="new-password"
            onChange={handlePasswordMatch}
            required
          />
          <TextField
            margin="normal"
            id="pwd2"
            label="Comfirm Password"
            type={"password"}
            autoComplete="off"
            onChange={handlePasswordMatch}
            required
          />
          <Typography variant="body2" id="error" color="red"></Typography>
          <Button
            style={styles.button}
            id="submitButton"
            variant="contained"
            type="submit"
          >
            Sign Up
          </Button>
          <SocialSignIn />
          <Button
            style={styles.button}
            onClick={() => {
              navigate("/login");
            }}
          >
            Change to Log in
          </Button>
        </Box>
      </form>

      {/* <Grid
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
                <input name="email" type="email" placeholder="Email" required />
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
      </Grid> */}
    </div>
  );
}

export default SignUp;
