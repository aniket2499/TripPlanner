// adding the modal to the page and passing the props to it using material-ui modal
// and the modal is a function that returns a modal with the props passed to it

import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalForHotel = ({ open, handleClose, hotel }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {hotel.name}
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {hotel.address}
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {hotel.phone}
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {hotel.rating}
          </Typography>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};

ModalForHotel.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  hotel: PropTypes.object.isRequired,
};

export default ModalForHotel;
