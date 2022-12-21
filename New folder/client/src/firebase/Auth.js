import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import firebaseApp from "./Firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ paddingTop: "20rem", paddingLeft: "50%" }}>
        <CircularProgress />
      </div>
    );
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
