import React from "react";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/FirebaseFunctions";
import "../App.css";
import { Button } from "@mui/material";

const SignOutBtn = () => {
  const navigate = useNavigate();
  return (
    <Button
      type="button"
      onClick={() => {
        doSignOut();
        navigate("/");
      }}
    >
      Sign Out
    </Button>
  );
};

export default SignOutBtn;
