import { Autocomplete } from "@react-google-maps/api";
import React, { useContext, useState } from "react";
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
} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import AddIcon from "@mui/icons-material/Add";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const CreateTrip = () => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [coords, setCoords] = useState({});
  const [StartDateError, setStartDateError] = useState(false);
  const [ReturnDateError, setReturnDateError] = useState(false);
  const [StartDateErrorMessage, setStartDateErrorMessage] = useState("");
  const [ReturnDateErrorMessage, setReturnDateErrorMessage] = useState("");
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [returnDate, setReturnDate] = useState(dayjs(new Date()));
  const [showReturnDate, setShowReturnDate] = useState(true);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    console.log(lat, lng);

    setCoords({ lat, lng });
  };
  console.log("here");
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
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <TextField sx={{ width: 400, ml: 6, mt: 3 }} label="Origin" />
          </Autocomplete>

          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <TextField sx={{ width: 400, ml: 6, mt: 3 }} label="Destination" />
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
                    "Return date cannot be before departure date"
                  );
                  setReturnDateError(true);
                  setReturnDateErrorMessage(
                    "Return date cannot be before departure date"
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
                    "Return date cannot be before departure date"
                  );
                  setReturnDateError(true);
                  setReturnDateErrorMessage(
                    "Return date cannot be before departure date"
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
                />
              )}
            />
          </LocalizationProvider>
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{ mt: 6, mb: 10 }}>
          <Button color="primary" variant="contained">
            <AddIcon sx={{ mr: 1 }} />
            Add Trip
          </Button>
        </Stack>
      </Paper>
    </div>
  );
};

export default CreateTrip;
