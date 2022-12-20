import React, { useContext, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import { doChangePassword } from "../firebase/FirebaseFunctions";
import "../App.css";
import { Button, TextField, Typography, Modal, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
const styles = {
  box: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 450,
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    marginTop: "7rem",
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
function ChangePassword() {
  const navigate = useNavigate();
  // new function
  const currUser = useContext(AuthContext);
  const [passwordMatch, setPasswordMatch] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    const { currentPassword, newPasswordOne, newPasswordTwo } =
      e.target.elements;

    if (newPasswordOne.value !== newPasswordTwo.value) {
      setPasswordMatch("New Passwords do not match, please try again");
      return false;
    }

    try {
      await doChangePassword(
        currUser.email,
        currentPassword.value,
        newPasswordOne.value,
      );
      alert("Password has been changed, you will now be logged out");
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

  if (currUser._delegate.providerData[0].providerId === "password") {
    return (
      <div>
        {passwordMatch && <h4 className="error">{passwordMatch}</h4>}
        <h2></h2>
        <form onSubmit={submitForm} autoComplete="off">
          <Box
            style={styles.box}
            sx={{
              ":hover": { boxShadow: "10px 10px 20px #ccc" },
              boxShadow: "5px 5px 10px #ccc",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              style={styles.modalheader}
              gutterBottom
            >
              Change Password
            </Typography>
            <TextField
              margin="normal"
              className="form-control"
              name="currentPassword"
              id="currentPassword"
              type="password"
              placeholder="Current Password"
              autoComplete="off"
              required
            />
            <TextField
              margin="normal"
              className="form-control"
              name="newPasswordOne"
              id="newPasswordOne"
              type="password"
              placeholder="Password"
              autoComplete="off"
              required
            />
            <TextField
              margin="normal"
              className="form-control"
              name="newPasswordTwo"
              id="newPasswordTwo"
              type="password"
              placeholder="Confirm Password"
              autoComplete="off"
              required
            />
            <Typography variant="body2" id="error" color="red"></Typography>
            <Button type="submit" style={{ marginTop: "2rem" }}>
              Change Password
            </Button>
          </Box>
        </form>
        <br />
      </div>
    );
  } else {
    return (
      <div>
        <h2>
          You are signed in using a Social Media Provider, You cannot change
          your password
        </h2>
      </div>
    );
  }
}

export default ChangePassword;
