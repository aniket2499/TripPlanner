import React, { useState, useContext } from "react";
import tripService from "../services/tripService";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";

import { Button, TextField, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import "../App.css";
import EmailIcon from "@mui/icons-material/Email";

const styles = {
  box: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    marginTop: "7rem",
    padding: "2rem",
    // border: "1px solid #c0c0c0",
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

function InviteToTrip() {
  const tripId = useParams();
  const trip_id = tripId.tripId;
  const currUser = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const userId = currUser._delegate.uid;

    e.preventDefault();
    let newData = {
      email: email,
      name: name,
      message: message,
    };
    let count = 0;
    if (!email) {
      count = count + 1;
    } else if (!name) {
      count = count + 1;
    }

    if (count === 0) {
      await tripService
        .inviteUserToTrip(trip_id, newData)
        .then((res) => {
          navigate(`/home`);
        })
        .catch((err) => {
          document.getElementById("error").innerHTML =
            err.response.data.message;
          document.getElementById("error").style.color = "red";
        });
    } else {
      if (!email) {
        document.getElementById("error").innerHTML = "Email Must be provided!!";
        document.getElementById("error").style.color = "red";
        count = count + 1;
      } else if (!name) {
        document.getElementById("error").innerHTML = "Name must be provided";
        document.getElementById("error").style.color = "red";
        count = count + 1;
      }
    }
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
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
            style={styles.header}
            gutterBottom
          >
            Invite To Trip
          </Typography>
          <TextField
            id="email"
            margin="normal"
            sx={{ width: "16rem" }}
            // label="Email"
            placeholder="Email"
            type={"email"}
            // value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            sx={{ width: "16rem" }}
            margin="normal"
            type={"text"}
            id="name"
            // label="Name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            sx={{ width: "16rem" }}
            margin="normal"
            type={"text"}
            id="message"
            // label="Message"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Typography variant="body2" id="error" color="red"></Typography>

          <Button
            style={styles.button}
            id="submitButton"
            variant="contained"
            type="submit"
          >
            Invite
            <EmailIcon sx={{ ml: 1, fontSize: "medium" }} />
          </Button>
          <Button
            onClick={() => {
              navigate(`/home`);
            }}
            style={styles.button}
            id="submitButton"
            type="submit"
          >
            Skip For Now
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default InviteToTrip;
