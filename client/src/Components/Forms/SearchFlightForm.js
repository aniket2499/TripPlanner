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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import SearchIcon from "@mui/icons-material/Search";

function SearchFlightForm() {
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [date, setDate] = useState(new Date());

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
    //make api call to get list of airports
    console.log(origin);
  };

  const handleDestChange = (event) => {
    setDest(event.target.value);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("origin: ", origin);
    console.log("dest: ", dest);
    console.log("date: ", date);
  };

  return (
    <div>
      <Paper
        elevation={3}
        style={{ padding: "10px", margin: "10px" }}
        display="flex"
        justifyContent="center"
      >
        <Stack direction="row" justifyContent="center" sx={{ mt: 10 }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={["hello", "world"]}
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
            disablePortal
            id="combo-box-demo"
            options={["hello", "world"]}
            sx={{ width: 400, ml: 6, mb: 3 }}
            renderInput={(params) => <TextField {...params} label="To" />}
          />
        </Stack>
        <Stack direction="row" justifyContent="center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Departure Date"
              inputFormat="MM/DD/YYYY"
              value={null}
              onChange={null}
              renderInput={(params) => (
                <TextField sx={{ width: 400, mr: 6, mt: 3 }} {...params} />
              )}
            />

            <DesktopDatePicker
              label="Departure Date"
              inputFormat="MM/DD/YYYY"
              sx={{ width: 400, mr: 6 }}
              value={null}
              onChange={null}
              renderInput={(params) => (
                <TextField sx={{ width: 400, ml: 6, mt: 3 }} {...params} />
              )}
            />
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
