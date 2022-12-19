import { Autocomplete, Data } from "@react-google-maps/api";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import tripService from "../services/tripService.js";
import { AuthContext } from "../firebase/Auth";
import actions from "../actions";

import {
  Paper,
  Button,
  Box,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import AddIcon from "@mui/icons-material/Add";

const styles = {
  box: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    marginTop: "7rem",
    padding: "2rem",
    // border: "1px solid #c0c0c0",
    borderRadius: "15px",
    //
  },
  header: {
    padding: "0.5rem",
    textAlign: "center",
  },
  button: {
    marginTop: "1rem",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  textField: {},
  cssLabel: {
    color: "#d3d3d3",
  },
  cssOutlinedInput: {
    "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline":
      {
        borderColor: "#d3d3d3", //default
      },
    "&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline": {
      borderColor: "#d3d3d3", //hovered #DCDCDC
    },
    "&$cssFocused $notchedOutline": {
      borderColor: "#23A5EB", //focused
    },
  },
  cssInputLabel: {
    color: "#d3d3d3",
  },
};

const CreateTrip = () => {
  let navigate = useNavigate();
  const currUser = useContext(AuthContext);
  const [autoorgcomplete, setOrgAutocomplete] = useState(null);
  const [autodestcomplete, setDestAutocomplete] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [origincoords, setOriginCoords] = useState({});
  const [destcoords, setDestCoords] = useState({});
  const [StartDateError, setStartDateError] = useState(false);
  const [ReturnDateError, setReturnDateError] = useState(false);
  const [StartDateErrorMessage, setStartDateErrorMessage] = useState("");
  const [ReturnDateErrorMessage, setReturnDateErrorMessage] = useState("");
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [returnDate, setReturnDate] = useState(dayjs(new Date()));
  const [showReturnDate, setShowReturnDate] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const onOriginLoad = (autoC) => {
    setOrgAutocomplete(autoC);
  };
  const onDestinationLoad = (autoC) => {
    setDestAutocomplete(autoC);
  };

  const onPlaceOriginChanged = () => {
    setOrigin(autoorgcomplete.gm_accessors_.place.jj.formattedPrediction);
    const lat = autoorgcomplete.getPlace().geometry.location.lat();
    const lng = autoorgcomplete.getPlace().geometry.location.lng();
    setOriginCoords({ lat, lng });
  };
  const onPlaceDestinationChanged = () => {
    setDestination(autodestcomplete.gm_accessors_.place.jj.formattedPrediction);
    const lat = autodestcomplete.getPlace().geometry.location.lat();
    const lng = autodestcomplete.getPlace().geometry.location.lng();
    setDestCoords({ lat, lng });
  };
  const submitForm = async (event) => {
    const userId = currUser._delegate.uid;
    setError("");
    setSuccess("");
    event.preventDefault();
    let newValues = {
      id: userId,
      cur_location: origin,
      destination: destination,
      tripDate: {
        startDate: startDate,
        endDate: returnDate,
      },
    };
    let newerrors = {};

    if (!newValues.cur_location) {
      newerrors.cur_location = "Origin Location is Invalid";
    } else if (!newValues.destination) {
      newerrors.destination = "Destination is Invalid";
    }

    if (
      dayjs(newValues.tripDate.endDate).isBefore(
        dayjs(newValues.tripDate.startDate),
      ) &&
      showReturnDate
    ) {
      newerrors.tripDate = "Return date cannot be before departure date";
      setStartDateError(true);
      setStartDateErrorMessage("Return date cannot be before departure date");
      setReturnDateError(true);
      setReturnDateErrorMessage("Return date cannot be before departure date");
    }

    if (Object.keys(newerrors).length === 0) {
      // console.log(newValues);
      await tripService
        .createTrip(newValues)
        .then((data) => {
          const trip_id = data._id;
          dispatch(
            actions.addTrip({
              _id: trip_id,
              cur_location: newValues.cur_location,
              destination: newValues.destination,
              tripDate: {
                startDate: newValues.tripDate.startDate,
                endDate: newValues.tripDate.endDate,
              },
              destination_lat: destcoords.lat,
              destination_long: destcoords.lng,
              userId: userId,
              tripName: "Trip to" + " " + newValues.destination.split(",")[0],
              hotel: [],
              attractions: [],
              explore: [],
              invites: [],
              itinerary: [],
              placesToVisit: [],
              restaurants: [],
            }),
          );
          navigate(`/${trip_id}/invite`);

          setSuccess("Trip added successfully!!");
          //once trip is created, send data to redux store

          //console.log("data" + data);

          //navigate(`/${trip_id}/invite`);
        })
        .catch((e) => {
          setError("Could not Add Trip. Try Again!!");
        });
    } else {
      if (newerrors.cur_location) {
        // alert(newerrors.cur_location);
        document.getElementById("error").innerHTML =
          "Origin Location is Invalid";
        document.getElementById("error").style.color = "red";
        setError(newerrors.cur_location);
      } else {
        // alert(newerrors.destination);
        document.getElementById("error").innerHTML = "Destination is Invalid";
        document.getElementById("error").style.color = "red";

        setError(newerrors.destination);
      }
    }
  };

  const trips = useSelector((state) => state.trips);
  return (
    <div>
      <form autoComplete="off" onSubmit={submitForm}>
        <Box
          style={styles.box}
          sx={{
            ":hover": { boxShadow: "10px 10px 20px #ccc" },
            boxShadow: "5px 5px 10px #ccc",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            style={styles.header}
            gutterBottom
          >
            Create Trip
          </Typography>
          <Autocomplete
            onLoad={onOriginLoad}
            onPlaceChanged={onPlaceOriginChanged}
          >
            <TextField
              sx={{ width: "16rem" }}
              margin="normal"
              // label="Origin"
              placeholder="Origin"
              name="cur_location"
              id="cur_location"
              type={"text"}
              onChange={() => {
                document.getElementById("error").innerHTML = "";
              }}
            />
          </Autocomplete>

          <Autocomplete
            onLoad={onDestinationLoad}
            onPlaceChanged={onPlaceDestinationChanged}
          >
            <TextField
              sx={{ width: "16rem" }}
              margin="normal"
              // label="Destination"
              placeholder="Destination"
              name="destination"
              id="destination"
              type={"text"}
              onChange={() => {
                document.getElementById("error").innerHTML = "";
              }}
            />
          </Autocomplete>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              // label="Start Date"
              placeholder="Start Date"
              disablePast
              inputFormat="MM/DD/YYYY"
              value={startDate}
              onSelect={(event) => {
                event.preventDefault();
              }}
              onChange={(newValue) => {
                setStartDateError(false);
                setStartDateErrorMessage("");
                setReturnDateError(false);
                setReturnDateErrorMessage("");
                setStartDate(newValue);
              }}
              id="startDate"
              renderInput={(params) => (
                <TextField
                  sx={{ width: "16rem" }}
                  margin="normal"
                  {...params}
                  error={StartDateError}
                  helperText={StartDateErrorMessage}
                  // onChange={handleStartDateChange}
                />
              )}
            />
            <DesktopDatePicker
              disabled={!showReturnDate}
              disablePast
              // label="Return Date"
              placeholder="Return Date"
              inputFormat="MM/DD/YYYY"
              value={returnDate}
              onChange={(newValue) => {
                setReturnDateError(false);
                setReturnDateErrorMessage("");
                setStartDateError(false);
                setStartDateErrorMessage("");
                setReturnDate(newValue);
              }}
              id="returnDate"
              renderInput={(params) => (
                <TextField
                  sx={{ width: "16rem" }}
                  margin="normal"
                  {...params}
                  error={ReturnDateError}
                  helperText={ReturnDateErrorMessage}
                  // onChange={handleEndDateChange}
                />
              )}
            />
          </LocalizationProvider>
          <Typography variant="body2" id="error" color="red"></Typography>

          <Button
            style={styles.button}
            id="submitButton"
            variant="contained"
            type="submit"
          >
            <AddIcon sx={{ mr: 1 }} />
            Add Trip
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default CreateTrip;
