import { Button } from "@mui/material";
import React from "react";
import { doSocialSignIn } from "../firebase/FirebaseFunctions";
import GoogleIcon from "@mui/icons-material/Google";

const SocialSignIn = () => {
  const styles = {
    button: {
      marginTop: "1.5rem",
      borderRadius: "35px",
    },
  };
  const handleSocialSignIn = async (provider) => {
    try {
      await doSocialSignIn(provider);
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
