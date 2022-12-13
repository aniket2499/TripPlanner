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
  Alert,
  Stack,
  AlertTitle,
  Modal,
} from "@mui/material";
import SocialSignIn from "./SocialSignIn";
import { Link, useNavigate, useParams } from "react-router-dom";

function SignUpInvite() {
  const currUser = useContext(AuthContext);
  const tripId = useParams();
  const [pswdMatch, setPswdMatch] = useState("");
  const [finalPswd, setFinalPswd] = useState("");
  const [userDispName, setUserDispName] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    },
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const userAlreadyExists =
      "Firebase: The email address is already in use by another account. (auth/email-already-in-use).";
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
          displayName.value
        );
        // alert("User Created Successfully");
        handleOpen();
      } catch (error) {
        console.log(error.message);
        if (error.message === userAlreadyExists) {
          document.getElementById("error").innerHTML =
            "User already exists. Please Login";
          document.getElementById("error").style.color = "red";
        } else {
          alert(error);
        }
      }
    }
  };
  const tripsAdded = [];
  tripsAdded.push(tripId);

  const addToMongo = async (obj) => {
    await userService.createUser({
      _id: obj._id,
      displayName: obj.displayName,
      email: obj.email,
      password: obj.password,
      trips: tripsAdded,
    });
  };

  const handleValidFormData = () => {
    console.log(document.getElementById("pwd1").value);
    console.log(document.getElementById("pwd2").value);
    console.log(
      document.getElementById("pwd1").value ===
        document.getElementById("pwd2").value
    );
    if (
      document.getElementById("pwd1").value !==
      document.getElementById("pwd2").value
    ) {
      document.getElementById("error").innerHTML = "Passwords do not match";
    }
  };

  if (currUser) {
    addToMongo({
      _id: currUser._delegate.uid,
      displayName: userDispName,
      email: currUser._delegate.email,
      password: finalPswd,
      trips: tripsAdded,
    });
    doSignOut();
    // navigate("/login");
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
            onChange={() => {
              document.getElementById("error").innerHTML = "";
            }}
            required
          />
          <TextField
            margin="normal"
            id="email"
            label="Email"
            type={"email"}
            autoComplete="new-password"
            onChange={() => {
              document.getElementById("error").innerHTML = "";
            }}
            required
          />
          <TextField
            margin="normal"
            id="pwd1"
            label="Password"
            type={"password"}
            autoComplete="new-password"
            onChange={() => {
              document.getElementById("error").innerHTML = "";
            }}
            // onChange={handlePasswordMatch}
            required
          />
          <TextField
            margin="normal"
            id="pwd2"
            label="Comfirm Password"
            type={"password"}
            autoComplete="off"
            onChange={() => {
              document.getElementById("error").innerHTML = "";
            }}
            // onChange={handlePasswordMatch}
            required
          />
          <Typography variant="body2" id="error" color="red"></Typography>
          <Button
            style={styles.button}
            id="submitButton"
            variant="contained"
            type="submit"
            onClick={handleValidFormData}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User Created Successfully
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please Login
          </Typography>
          <Button
            style={styles.button}
            variant="contained"
            onClick={() => {
              navigate("/login");
            }}
          >
            Log In
          </Button>
        </Box>
      </Modal>
      ;
    </div>
  );
}

export default SignUpInvite;
