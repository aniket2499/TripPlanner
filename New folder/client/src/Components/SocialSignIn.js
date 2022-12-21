import { Button } from "@mui/material";
import React from "react";
import { doSocialSignIn } from "../firebase/FirebaseFunctions";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";

const SocialSignIn = () => {
  const navigate = useNavigate();
  const styles = {
    button: {
      marginTop: "1.5rem",
      borderRadius: "35px",
    },
  };
  const handleSocialSignIn = async (provider) => {
    try {
      await doSocialSignIn(provider);
      navigate("/home");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Button style={styles.button} onClick={() => handleSocialSignIn("google")}>
      <GoogleIcon />
    </Button>
  );
};

export default SocialSignIn;
