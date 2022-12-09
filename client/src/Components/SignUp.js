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
    doSignOut();
    navigate("/login");
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
    </div>
  );
}

export default SignUp;
