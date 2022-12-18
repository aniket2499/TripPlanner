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
  Autocomplete,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import SearchIcon from "@mui/icons-material/Search";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function SearchFlightForm({ handleSearch }) {
  const [originDropdown, setOriginOriginDropdown] = useState(["Austin(AUS)"]);
  const [destinationDropdown, setDestinationDropdown] = useState(["NYC(JFK)"]);
  const [departureDate, setDepartureDate] = useState(dayjs(new Date()));
  const [returnDate, setReturnDate] = useState(dayjs(new Date()));
  const [showReturnDate, setShowReturnDate] = useState(true);

  const [FromError, setFromError] = useState(false);
  const [FromErrorMessage, setFromErrorMessage] = useState("");
  const [ToError, setToError] = useState(false);
  const [ToErrorMessage, setToErrorMessage] = useState("");
  const [DepartureDateError, setDepartureDateError] = useState(false);
  const [DepartureDateErrorMessage, setDepartureDateErrorMessage] =
    useState("");
  const [ReturnDateError, setReturnDateError] = useState(false);
  const [ReturnDateErrorMessage, setReturnDateErrorMessage] = useState("");

  let origin = "";
  let destination = "";

  const handleOriginChange = async (event) => {
    event.preventDefault();
    setFromError(false);
    origin = event.target.value;
    let { data } = await axios.get(
      `http://localhost:3001/api/flights/city/${origin}`,
    );
    let airports = [];
    for (let x of data) {
      airports.push(x.address.cityName + " (" + x.iataCode + ")");
    }
    setOriginOriginDropdown(airports);
  };

  const handleDestinationChange = async (event) => {
    event.preventDefault();
    setToError(false);
    destination = event.target.value;
    let { data } = await axios.get(
      `http://localhost:3001/api/flights/city/${destination}`,
    );
    let airports = [];
    for (let x of data) {
      airports.push(x.address.cityName + " (" + x.iataCode + ")");
    }
    setDestinationDropdown(airports);
  };

  const submitForm = (event) => {
    event.preventDefault();
    let searchObject = {};
    let localfromerror = false;
    let localtoerror = false;
    let localDepartureDateerror = false;
    let localReturnDateerror = false;
    if (document.getElementById("originTextField").value.length === 0) {
      localfromerror = true;
      setFromError(true);
      setFromErrorMessage("Please select an origin");
    } else {
      searchObject["originCity"] = document
        .getElementById("originTextField")
        .value.split("(")[1]
        .split(")")[0];
    }
    if (document.getElementById("destinationTextField").value.length === 0) {
      localtoerror = true;
      setToError(true);
      setToErrorMessage("Please select an destination");
    } else {
      searchObject["destinationCity"] = document
        .getElementById("destinationTextField")
        .value.split("(")[1]
        .split(")")[0];
    }

    if (dayjs(returnDate).isBefore(dayjs(departureDate)) && showReturnDate) {
      localReturnDateerror = true;
      setDepartureDateError(true);
      setDepartureDateErrorMessage(
        "Return date cannot be before departure date",
      );
      setReturnDateError(true);
      setReturnDateErrorMessage("Return date cannot be before departure date");
    } else {
      searchObject["departureDate"] = departureDate;
      searchObject["returnDate"] = returnDate;
    }
    searchObject["departureDateFormatted"] = departureDate.format("YYYY-MM-DD");
    searchObject["returnDateFormatted"] = returnDate.format("YYYY-MM-DD");
    if (
      !localfromerror &&
      !localtoerror &&
      !localDepartureDateerror &&
      !localReturnDateerror
    ) {
      handleSearch(searchObject);
    }
  };

  return (
    <div>
      <Paper
        elevation={3}
        style={{ padding: "10px", margin: "10px" }}
        display="flex"
        justifyContent="center"
      >
        <Stack spacing={2} direction="row" sx={{ mr: 25 }} justifyContent="end">
          <FormControl>
            <Stack direction="row">
              <FormLabel id="demo-row-radio-buttons-group-label" sx={{ m: 3 }}>
                Trip Type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue="RoundTrip"
                onChange={(event) => {
                  event.preventDefault();
                  if (event.target.value === "RoundTrip") {
                    setShowReturnDate(true);
                  } else {
                    setReturnDateError(false);
                    setReturnDateErrorMessage("");
                    setShowReturnDate(false);
                  }
                }}
              >
                <FormControlLabel
                  value="RoundTrip"
                  control={<Radio />}
                  label="Round Trip"
                  placeholder="Round Trip"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="OneWay"
                  placeholder="One Way"
                />
              </RadioGroup>
            </Stack>
          </FormControl>
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{ mt: 10 }}>
          <Autocomplete
            loading
            disablePortal
            onSelect={(event) => {
              event.preventDefault();
              setFromError(false);
              setFromErrorMessage("");
            }}
            id="originTextField"
            options={originDropdown}
            sx={{ width: 400, mr: 6, mb: 3 }}
            renderInput={(params) => (
              <TextField
                error={FromError}
                helperText={FromErrorMessage}
                {...params}
                // label="From"
                placeholder="From"
                onChange={handleOriginChange}
              />
            )}
          />

          <Autocomplete
            loading
            disablePortal
            onSelect={(event) => {
              event.preventDefault();
              setToError(false);
              setToErrorMessage("");
            }}
            id="destinationTextField"
            options={destinationDropdown}
            sx={{ width: 400, ml: 6, mb: 3 }}
            renderInput={(params) => (
              <TextField
                error={ToError}
                helperText={ToErrorMessage}
                {...params}
                // label="To"
                placeholder="To"
                onChange={handleDestinationChange}
              />
            )}
          />
        </Stack>
        <Stack direction="row" justifyContent="center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Departure Date"
              disablePast
              inputFormat="MM/DD/YYYY"
              value={departureDate}
              onSelect={(event) => {
                event.preventDefault();
                DepartureDateError(false);
                setDepartureDateError("");
              }}
              onChange={(newValue) => {
                setDepartureDateError(false);
                setDepartureDateErrorMessage("");
                setReturnDateError(false);
                setReturnDateErrorMessage("");
                setDepartureDate(newValue);
              }}
              id="departureDate"
              renderInput={(params) => (
                <TextField
                  sx={{ width: 400, mr: 6, mt: 3 }}
                  {...params}
                  error={DepartureDateError}
                  helperText={DepartureDateErrorMessage}
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
                setReturnDateError(false);
                setReturnDateErrorMessage("");
                setDepartureDateError(false);
                setDepartureDateErrorMessage("");
                setReturnDate(newValue);
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
          <Button color="primary" variant="contained" onClick={submitForm}>
            <SearchIcon sx={{ mr: 1 }} />
            Search
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}
export default SearchFlightForm;

//added by me done by me bug
