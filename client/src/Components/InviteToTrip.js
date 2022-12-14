// creating form for invite user to trip using material ui
import React, { useState, useContext } from "react";
import SocialSignIn from "./SocialSignIn";
import tripService from "../services/tripService";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";

import { Button, Grid, TextField, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import "../App.css";

function InviteToTrip() {
  const tripId = useParams();
  const trip_id = tripId.tripId;
  // tripId = tripId.toString();
  console.log(trip_id, typeof trip_id);
  const currUser = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // const tripId = "63934796bd080530bbdc3111";
    const userId = currUser._delegate.uid;
    e.preventDefault();
    let newData = {
      email: email,
      name: name,
      message: message,
    };
    // console.log(newData, "-====");
    await tripService
      .inviteUserToTrip(trip_id, newData)
      .then((res) => {
        console.log(res);
        navigate(`/my-trips/${trip_id}`);
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="message"
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Invite
        </Button>
      </form>
    </div>
  );
}

export default InviteToTrip;
