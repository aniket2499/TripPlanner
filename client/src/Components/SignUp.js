import React, { useState, useContext } from "react";
import { doCreateUserWithEmailAndPassword } from "../firebase/FirebaseFunctions";
import { AuthContext } from "../firebase/Auth";
import { doSignOut } from "../firebase/FirebaseFunctions";
import userService from "../services/userService";
import "../App.css";
import { Box } from "@mui/system";
import { Button, TextField, Typography, Modal } from "@mui/material";
import SocialSignIn from "./SocialSignIn";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "@emotion/react";

function SignUp() {
  const currUser = useContext(AuthContext);
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
      marginTop: "4rem",
      padding: "2rem",
      border: "1px solid #c0c0c0",
      borderRadius: "15px",
      //
    },
    header: {
      padding: "0.5rem",
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
    textField: {},
    cssLabel: {
      color: "#d3d3d3",
    },
    cssOutlinedInput: {
      "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline":
        {
          borderColor: "#d3d3d3", //default
        },
      "&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline": {
        borderColor: "#d3d3d3", //hovered #DCDCDC
      },
      "&$cssFocused $notchedOutline": {
        borderColor: "#23A5EB", //focused
      },
    },
    cssInputLabel: {
      color: "#d3d3d3",
    },
  };
  const checkPassword = (password) => {
    if (password.indexOf(" ") > 1) throw "Password must not contain spaces";

    if (!password) throw " Please enter a password";

    password = password.trim();

    if (password.length === 0) throw "Cannot have empty Password";

    if (password.split(" ").length > 1) throw "Password has Spaces inside";

    let letter = /[a-zA-Z]/;
    let number = /[0-9]/;

    let result = number.test(password) && letter.test(password);

    if (!result) throw "Password must contain numbers and alphabets";
    if (!(password.split("").length >= 6))
      throw "Password should have atleast 6 characters";
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
        checkPassword(pwd1.value);
        setFinalPswd(pwd1.value);
        setUserDispName(displayName.value);
        await doCreateUserWithEmailAndPassword(
          email.value,
          pwd1.value,
          displayName.value,
        );
        // alert("User Created Successfully");
        handleOpen();
      } catch (error) {
        if (error.message === userAlreadyExists) {
          document.getElementById("error").innerHTML =
            "User already exists. Please Login";
          document.getElementById("error").style.color = "red";
        } else {
          document.getElementById("error").innerHTML = error;
          document.getElementById("error").style.color = "red";
        }
      }
    }
  };

  const addToMongo = async (obj) => {
    try {
      await userService.createUser({
        _id: obj._id,
        displayName: obj.displayName,
        email: obj.email,
        password: obj.password,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleValidFormData = () => {
    console.log(document.getElementById("pwd1").value);
    console.log(document.getElementById("pwd2").value);
    console.log(
      document.getElementById("pwd1").value ===
        document.getElementById("pwd2").value,
    );
    if (
      document.getElementById("pwd1").value !==
      document.getElementById("pwd2").value
    ) {
      document.getElementById("error").innerHTML = "Passwords do not match";
    }
  };

  if (currUser) {
    console.log(currUser, "====");
    console.log(finalPswd, "===");
    try {
      addToMongo({
        _id: currUser._delegate.uid,
        displayName: userDispName,
        email: currUser._delegate.email,
        password: finalPswd,
      });
      doSignOut();
    } catch (e) {
      console.log(e);
      alert(e);
    }
    // navigate("/login");
  }

  return (
    <div className="bc-image">
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
            margin="dense"
            id="displayName"
            // label="Name"
            placeholder="Name"
            type={"text"}
            onChange={() => {
              document.getElementById("error").innerHTML = "";
            }}
            required
          />
          <TextField
            margin="dense"
            id="email"
            // label="Email"
            placeholder="Email"
            type={"email"}
            autoComplete="new-password"
            style={styles.textField}
            onChange={() => {
              document.getElementById("error").innerHTML = "";
            }}
            required
          />
          <TextField
            margin="dense"
            id="pwd1"
            // label="Password"
            placeholder="Password"
            type={"password"}
            autoComplete="new-password"
            style={styles.textField}
            onChange={() => {
              document.getElementById("error").innerHTML = "";
            }}
            // onChange={handlePasswordMatch}
            required
          />
          <TextField
            margin="dense"
            id="pwd2"
            // label="Comfirm Password"
            placeholder="Confirm Password"
            type={"password"}
            autoComplete="off"
            style={styles.textField}
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
            Already have an Account? Login here!
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

export default SignUp;
