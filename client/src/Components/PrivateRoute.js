import { Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import { useNavigate } from "react-router-dom";
import { Box, Button, Modal } from "@mui/material";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const currentUser = useContext(AuthContext);
  console.log("Private Route Comp current user", currentUser);
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page

  if (!currentUser) {
    alert("You must be logged in to view this page");
    // return navigate("/login");
  }

  return currentUser ? <Outlet /> : navigate("/login");
};

export default PrivateRoute;
