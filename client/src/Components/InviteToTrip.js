// creating form for invite user to trip using material ui
import React, { useState } from "react";
import SocialSignIn from "./SocialSignIn";
import tripService from "../services/tripService";
import { useNavigate } from "react-router-dom";

import { Button, Grid, TextField, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import "../App.css";

export default function InviteToTrip() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newData = {
      email: email,
      message: message,
    };
    console.log(newData, "-====");
    await tripService
      .inviteUserToTrip(newData)
      .then((res) => {
        console.log(res);
        navigate("/home");
      })
      .catch((err) => {
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
