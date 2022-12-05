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

function SearchFlightForm() {
  const [originDropdown, setOriginOriginDropdown] = useState(["Austin(AUS)"]);
  const [destinationDropdown, setDestinationDropdown] = useState(["NYC"]);
  const [departureDate, setDepartureDate] = useState(dayjs(new Date()));
  const [returnDate, setReturnDate] = useState(dayjs(new Date()));
  const [showReturnDate, setShowReturnDate] = useState(true);
  let origin = "";
  let destination = "";

  const handleOriginChange = async (event) => {
    event.preventDefault();
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
                onChange={(event) => {
                  event.preventDefault();
                  if (event.target.value === "RoundTrip") {
                    console.log("roundtrip");
                    setShowReturnDate(true);
                  } else {
                    setShowReturnDate(false);
                  }
                }}
              >
                <FormControlLabel
                  value="RoundTrip"
                  control={<Radio />}
                  label="Round Trip"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="OneWay"
                />
              </RadioGroup>
            </Stack>
          </FormControl>
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{ mt: 10 }}>
          <Autocomplete
            loading
            disablePortal
            id="combo-box-demo"
            options={originDropdown}
            sx={{ width: 400, mr: 6, mb: 3 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="From"
                onChange={handleOriginChange}
              />
            )}
          />

          <Autocomplete
            loading
            disablePortal
            id="combo-box-demo"
            options={destinationDropdown}
            sx={{ width: 400, ml: 6, mb: 3 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="To"
                onChange={handleDestinationChange}
              />
            )}
          />
        </Stack>
        <Stack direction="row" justifyContent="center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Departure Date"
              inputFormat="MM/DD/YYYY"
              value={departureDate}
              onChange={(newValue) => {
                setDepartureDate(newValue);
              }}
              renderInput={(params) => (
                <TextField sx={{ width: 400, mr: 6, mt: 3 }} {...params} />
              )}
            />
            <DesktopDatePicker
              disabled={!showReturnDate}
              label="Return Date"
              inputFormat="MM/DD/YYYY"
              sx={{ width: 400, mr: 6 }}
              value={returnDate}
              onChange={(newValue) => {
                setReturnDate(newValue);
              }}
              renderInput={(params) => (
                <TextField sx={{ width: 400, ml: 6, mt: 3 }} {...params} />
              )}
            />
            {/* {showReturnDate ? (
              <DesktopDatePicker
                label="Return Date"
                inputFormat="MM/DD/YYYY"
                sx={{ width: 400, mr: 6 }}
                value={returnDate}
                onChange={(newValue) => {
                  setReturnDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField sx={{ width: 400, ml: 6, mt: 3 }} {...params} />
                )}
              />
            ) : (
              <DesktopDatePicker
                disabled
                label="Return Date"
                inputFormat="MM/DD/YYYY"
                sx={{ width: 400, mr: 6 }}
                value={returnDate}
                onChange={(newValue) => {
                  setReturnDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField sx={{ width: 400, ml: 6, mt: 3 }} {...params} />
                )}
              />
            )} */}
          </LocalizationProvider>
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{ mt: 6, mb: 10 }}>
          <Button color="primary" variant="contained">
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
