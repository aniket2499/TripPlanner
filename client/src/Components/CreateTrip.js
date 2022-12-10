import { Autocomplete, Data } from "@react-google-maps/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import tripService from "../services/tripService.js";
import {
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  CardMedia,
  Box,
  Divider,
  Icon,
  Stack,
  ListItem,
  List,
  InputLabel,
  FormHelperText,
  TextField,
  Experimental_CssVarsProvider,
} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import AddIcon from "@mui/icons-material/Add";

const CreateTrip = () => {
  let navigate = useNavigate();
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
    setError("");
    setSuccess("");
    event.preventDefault();
    let newValues = {
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
    if (Object.keys(newerrors).length === 0) {
      console.log(newValues);
      await tripService
        .createTrip(newValues)
        .then((data) => {
          setSuccess("Trip added successfully!!");
          navigate("/home");
        })
        .catch((e) => {
          setError("Could not Add Trip. Try Again!!");
        });
    } else {
      if (newerrors.cur_location) {
        alert(newerrors.cur_location);
        setError(newerrors.cur_location);
      } else {
        alert(newerrors.destination);
        setError(newerrors.destination);
      }
    }
  };

  return (
    <div>
      <Paper
        elevation={4}
        style={{ padding: "10px", margin: "10px" }}
        display="flex"
        justifyContent="center"
      >
        <Stack
          spacing={10}
          direction="row"
          justifyContent="center"
          sx={{ mt: 10 }}
        >
          <Autocomplete
            onLoad={onOriginLoad}
            onPlaceChanged={onPlaceOriginChanged}
          >
            <TextField
              sx={{ width: 400, ml: 6, mt: 3 }}
              label="Origin"
              name="cur_location"
              // onChange={handleChange}
            />
          </Autocomplete>

          <Autocomplete
            onLoad={onDestinationLoad}
            onPlaceChanged={onPlaceDestinationChanged}
          >
            <TextField
              sx={{ width: 400, ml: 6, mt: 3 }}
              label="Destination"
              name="destination"
              // onChange={handleChange}
            />
          </Autocomplete>
        </Stack>
        <Stack direction="row" justifyContent="center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Start Date"
              disablePast
              inputFormat="MM/DD/YYYY"
              value={startDate}
              onSelect={(event) => {
                event.preventDefault();
                console.log(event.target.value);
              }}
              onChange={(newValue) => {
                if (
                  dayjs(returnDate).isBefore(dayjs(newValue)) &&
                  showReturnDate
                ) {
                  setStartDateError(true);
                  setStartDateErrorMessage(
                    "Return date cannot be before departure date",
                  );
                  setReturnDateError(true);
                  setReturnDateErrorMessage(
                    "Return date cannot be before departure date",
                  );
                } else {
                  setStartDateError(false);
                  setStartDateErrorMessage("");
                  setReturnDateError(false);
                  setReturnDateErrorMessage("");
                  setStartDate(newValue);
                }
              }}
              id="startDate"
              renderInput={(params) => (
                <TextField
                  sx={{ width: 400, mr: 6, mt: 3 }}
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
              label="Return Date"
              inputFormat="MM/DD/YYYY"
              sx={{ width: 400, mr: 6 }}
              value={returnDate}
              onChange={(newValue) => {
                if (
                  dayjs(newValue).isBefore(dayjs(startDate)) &&
                  showReturnDate
                ) {
                  setStartDateError(true);
                  setStartDateErrorMessage(
                    "Return date cannot be before departure date",
                  );
                  setReturnDateError(true);
                  setReturnDateErrorMessage(
                    "Return date cannot be before departure date",
                  );
                } else {
                  setReturnDateError(false);
                  setReturnDateErrorMessage("");
                  setStartDateError(false);
                  setStartDateErrorMessage("");
                  setReturnDate(newValue);
                }
              }}
              id="returnDate"
              renderInput={(params) => (
                <TextField
                  sx={{ width: 400, ml: 6, mt: 3 }}
                  {...params}
                  error={ReturnDateError}
                  helperText={ReturnDateErrorMessage}
                  // onChange={handleEndDateChange}
                />
              )}
            />
          </LocalizationProvider>
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{ mt: 6, mb: 10 }}>
          <Button color="primary" variant="contained" onClick={submitForm}>
            <AddIcon sx={{ mr: 1 }} />
            Add Trip
          </Button>
        </Stack>
      </Paper>
    </div>
  );
};

export default CreateTrip;
