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

  function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <React.Fragment>
        <Button onClick={handleOpen}>Open Child Modal</Button>
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ width: 200 }}>
            <h2 id="child-modal-title">Text in a child modal</h2>
            <p id="child-modal-description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
            <Button onClick={handleClose}>Close Child Modal</Button>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }

  if (!currentUser) {
    // alert("You must be logged in to view this page");
  }

  return currentUser ? <Outlet /> : navigate("/login");
};

export default PrivateRoute;
