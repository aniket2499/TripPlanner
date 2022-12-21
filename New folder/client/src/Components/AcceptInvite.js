import React, { useState, useContext } from "react";
import SocialSignIn from "./SocialSignIn";
import tripService from "../services/tripService";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";

import { Button, Grid, TextField, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import "../App.css";

const AcceptInvite = () => {
  const navigate = useNavigate();
  const tripId = useParams();
  const userId = useParams();
  const currUser = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await tripService
      .acceptTripInvite(tripId, userId)
      .then((res) => {
        if (currUser) {
          navigate("/home");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
        // console.log(err);
        navigate("/404", {
          state: {
            message: err.response.data.message,
          },
        });
      });
  };
  return (
    <div>
      <Typography component="p" variant="p" padding="7rem">
        Accept your invite to view your itinerary
      </Typography>
      <form onSubmit={handleSubmit}>
        <Button variant="contained" color="primary" type="submit">
          Accept Invite
        </Button>
      </form>
    </div>
  );
};

export default AcceptInvite;
