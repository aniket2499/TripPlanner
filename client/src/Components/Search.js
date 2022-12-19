import {
  AppBar,
  Grid,
  IconButton,
  Skeleton,
  Toolbar,
  Typography,
  Button,
  TextField,
  Paper,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  MenuItem,
  Menu,
  Rating,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import getApiData from "../services/getApiData";
import Maps from "./Maps";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Autocomplete } from "@react-google-maps/api";
import PlaceIcon from "@mui/icons-material/Place";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import StarIcon from "@mui/icons-material/Star";
import { Stack } from "@mui/system";

var isoCountries = {
  AF: "Afghanistan",
  AX: "Aland Islands",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua And Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia",
  BA: "Bosnia And Herzegovina",
  BW: "Botswana",
  BV: "Bouvet Island",
  BR: "Brazil",
  IO: "British Indian Ocean Territory",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CV: "Cape Verde",
  KY: "Cayman Islands",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Christmas Island",
  CC: "Cocos (Keeling) Islands",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo",
  CD: "Congo, Democratic Republic",
  CK: "Cook Islands",
  CR: "Costa Rica",
  CI: "Cote D'Ivoire",
  HR: "Croatia",
  CU: "Cuba",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  ET: "Ethiopia",
  FK: "Falkland Islands (Malvinas)",
  FO: "Faroe Islands",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  TF: "French Southern Territories",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard Island & Mcdonald Islands",
  VA: "Holy See (Vatican City State)",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran, Islamic Republic Of",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle Of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KR: "Korea",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libyan Arab Jamahiriya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MK: "Macedonia",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Micronesia, Federated States Of",
  MD: "Moldova",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands",
  AN: "Netherlands Antilles",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestinian Territory, Occupied",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  RE: "Reunion",
  RO: "Romania",
  RU: "Russian Federation",
  RW: "Rwanda",
  BL: "Saint Barthelemy",
  SH: "Saint Helena",
  KN: "Saint Kitts And Nevis",
  LC: "Saint Lucia",
  MF: "Saint Martin",
  PM: "Saint Pierre And Miquelon",
  VC: "Saint Vincent And Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome And Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  GS: "South Georgia And Sandwich Isl.",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SJ: "Svalbard And Jan Mayen",
  SZ: "Swaziland",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syrian Arab Republic",
  TW: "Taiwan",
  TJ: "Tajikistan",
  TZ: "Tanzania",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad And Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks And Caicos Islands",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UM: "United States Outlying Islands",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela",
  VN: "Viet Nam",
  VG: "Virgin Islands, British",
  VI: "Virgin Islands, U.S.",
  WF: "Wallis And Futuna",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};

function getCountryName(countryCode) {
  if (isoCountries.hasOwnProperty(countryCode)) {
    return isoCountries[countryCode];
  } else {
    return countryCode;
  }
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "8rem",
  lineHeight: "60px",
  margin: "0 30px",
  marginTop: "1rem",
  boxShadow: "1 0 1 0",
  backgroundImage: `url(${"./img/travel.jpg"})`,
}));

const styles = {
  button: {
    backgroundColor: "#000",
    color: "#fff",
    padding: 0,
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    textTransform: "none",

    margin: 0,
    "&:hover": {
      backgroundColor: "#fff",
      color: "#3c52b2",
    },
  },
};

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [restaurantsList, setRestaurantsList] = useState(undefined);
  const [hotelsList, setHotelsList] = useState(undefined);
  const [attractionsList, setAttractionsList] = useState(undefined);
  const [weatherData, setWeatherData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);
  const [coords, setCoords] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const trips = useSelector((state) => state.trips);
  // const [index, setIndex] = useState(0);
  let index = 0;

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  console.log(trips);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const destination = autocomplete.getPlace().formatted_address;
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    // console.log(lat, lng);
    setCoords({ lat, lng });
    console.log(`${lng}`);
    navigate(`/search/${searchTerm}`, {
      state: {
        destination: destination,
        longitude: lng,
        lattitude: lat,
      },
    });
    setLoading(true);
    document.getElementById("search-box").value = "";
  };

  useEffect(() => {
    document.getElementById("app-bar").style.display = "none";
    async function fetchData() {
      try {
        const attractions = await getApiData.getAttractionsData(
          location.state.destination
            ? location.state.destination.split(",")[0]
            : "",
          1,
          4,
        );
        const restaurants = await getApiData.getRestaurantData(
          location.state.destination
            ? location.state.destination.split(",")[0]
            : "",
          1,
          4,
        );
        const hotels = await getApiData.getHotelData(
          location.state.destination
            ? location.state.destination.split(",")[0]
            : "",
          1,
          4,
        );
        const weather = await getApiData.getWeatherData(
          //send today's date in MM/DD/YYYY format by default
          `${mm}-${dd}-${yyyy}`,
          location.state.lattitude,
          location.state.longitude,
        );
        setAttractionsList(attractions);
        setRestaurantsList(restaurants);
        setHotelsList(hotels);
        setWeatherData(weather);
        setLoading(false);
      } catch (error) {
        console.log(error);
        // navigate("/404");
      }
    }
    fetchData();

    return () => {
      // location.state.destination = "";
      console.log("cleaned up");
    };
  }, [location.state.destination]);

  console.log(weatherData);
  // console.log(restaurantsList);
  // console.log(hotelsList);
  // console.log(attractionsList);

  if (loading) {
    return (
      <div style={{ marginTop: "6rem" }}>
        <Skeleton animation="wave" />
      </div>
    );
  } else {
    return (
      <Grid container>
        {/* <Grid> */}
        {/* <Grid container spacing={2}> */}
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
          lg={6}
          style={{ backgroundColor: "#ffffff" }}
          sx={{ overflow: "auto" }}
          height="100vh"
        >
          <AppBar
            position="static"
            color="inherit"
            style={{ boxShadow: "none" }}
          >
            <Toolbar>
              <Grid item xs={7}>
                <Button
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                  onClick={() => {
                    navigate("/home");
                    document.getElementById("app-bar").style.display = "block";
                  }}
                >
                  <ArrowBackIcon />
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  <TextField
                    id="search-box"
                    // label="Search"
                    placeholder="Search"
                    variant="outlined"
                    style={{
                      marginTop: "0.5rem",
                      marginBottom: "0.5rem",
                      width: "14rem",
                      border: "none",
                    }}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                </Autocomplete>
              </Grid>
            </Toolbar>
          </AppBar>
          <Grid item xs={12} paddingTop="1rem">
            <Item elevation={2}>
              <Typography
                variant="h6"
                component="div"
                style={{
                  textAlign: "left",
                  paddingLeft: "1rem",
                  paddingTop: "0.5rem",

                  fontWeight: 500,
                }}
              >
                {`Planning your trip to
                    ${location.state.destination.split(",")[0]} ?`}
              </Typography>
              <Typography
                variant="body2"
                component="div"
                style={{
                  textAlign: "left",
                  paddingLeft: "1rem",
                  paddingTop: "0.5rem",
                  // fontWeight: "bold",
                }}
              >
                Build, organize, and map out your best trip yet.
              </Typography>
              <Grid item xs={2.2}>
                <Button
                  sx={{
                    width: "7rem",
                    paddingLeft: "0.5rem",
                    textTransform: "none",
                  }}
                >
                  Start Planning
                </Button>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={12} padding="2rem" container>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                component="div"
                style={{
                  textAlign: "left",
                  paddingLeft: "1rem",
                  paddingTop: "0.5rem",
                  fontWeight: 500,
                }}
              >
                {weatherData[0].description
                  ? weatherData[0].description.charAt(0).toUpperCase() +
                    weatherData[0].description.slice(1) +
                    " in " +
                    location.state.destination.split(",")[0]
                  : ""}
              </Typography>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="h3"
                    component="div"
                    style={{
                      textAlign: "left",
                      paddingLeft: "1rem",
                      paddingTop: "0.5rem",
                      fontWeight: 500,
                    }}
                  >
                    {weatherData[0].temperature
                      ? weatherData[0].temperature.toString().split(".")[0] +
                        "°F"
                      : ""}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    component="div"
                    style={{
                      textAlign: "left",

                      paddingLeft: "1rem",
                      paddingTop: "0.5rem",
                    }}
                  >
                    {location.state.destination.split(",")[0]}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <img
                  src={weatherData[0].icon}
                  // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={weatherData[0].description}
                  loading="lazy"
                />
              </Grid>
            </Grid>

            {/* <Grid item xs={3}>
              <img
                src={weatherData[0].icon}
                // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={weatherData[0].description}
                loading="lazy"
              />
            </Grid> */}
            {/* <Grid item xs={9}>
              fdlj
            </Grid> */}
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              padding: "2rem",
            }}
          >
            <Typography variant="h6" component="h1" fontWeight={"bold"}>
              Top Attractions
            </Typography>
            <hr paddingright="2rem" />
          </Grid>
          {attractionsList.map((attraction) => {
            return (
              <Grid
                key={attraction.dupeId}
                item
                xs={12}
                style={{
                  padding: "2rem",
                  paddingTop: "0rem",
                  paddingRight: "2rem",
                }}
              >
                <Card sx={{ width: "100%" }}>
                  <CardActionArea>
                    <CardContent>
                      <Grid spacing={2} container>
                        <Grid item xs={1}>
                          <PlaceIcon />
                        </Grid>
                        <Grid item xs={9}>
                          <Typography
                            gutterBottom
                            variant="body1"
                            fontWeight="600"
                            component="div"
                          >
                            {attraction.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            style={styles.button}
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                          >
                            Save
                            <BookmarkBorderIcon sx={{ color: "white" }} />
                          </Button>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                navigate("/createtrip");
                                document.getElementById(
                                  "app-bar",
                                ).style.display = "block";
                              }}
                            >
                              <Typography variant="bidy1" fontWeight="800">
                                Create A Plan
                              </Typography>
                            </MenuItem>

                            {trips.map((trip, index) => (
                              <MenuItem key={index}>
                                <Typography variant="caption">
                                  {`Trip to ${trip.destination.split(",")[0]}`}
                                </Typography>
                              </MenuItem>
                            ))}
                          </Menu>
                          <Grid item xs={12}></Grid>
                        </Grid>
                        <Grid container item xs={7}>
                          <Grid item xs={12}>
                            <Typography variant="bode2" fontWeight={"600"}>
                              Address:{" "}
                            </Typography>
                            <Typography variant="bode2">
                              {`${
                                attraction.address_obj
                                  ? attraction.address_obj.street1
                                  : ""
                              },
                                ${
                                  attraction.address_obj
                                    ? attraction.address_obj.city
                                    : ""
                                }, 
                                  ${
                                    attraction.address_obj
                                      ? attraction.address_obj.state
                                      : ""
                                  }, 
                                  ${
                                    attraction.address_obj
                                      ? attraction.address_obj.postal_code
                                      : ""
                                  }, 
                                  ${
                                    attraction.address_obj
                                      ? attraction.address_obj.country
                                      : ""
                                  }`}
                            </Typography>
                            <br />
                            <br />
                            <Typography variant="bode2" fontWeight={"600"}>
                              Category:{" "}
                            </Typography>
                            <Typography variant="bode2">
                              {`${
                                attraction.subcategory
                                  ? attraction.subcategory[0].name
                                  : "No category available"
                              }`}
                            </Typography>
                            <br />
                            <br />
                            <Typography variant="bode2" fontWeight={"600"}>
                              Description:{" "}
                            </Typography>
                            <Typography variant="bode2">
                              {`${
                                attraction.description
                                  ? attraction.description
                                  : "No description available"
                              }`}
                            </Typography>
                            <br />
                            <br />
                            <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                              <Rating
                                name="read-only"
                                value={
                                  attraction.rating ? attraction.rating : 3
                                }
                                readOnly
                              />
                            </Stack>
                          </Grid>
                        </Grid>
                        <Grid item xs={5} padding="2rem">
                          <CardMedia
                            sx={{ borderRadius: "0.5rem" }}
                            component="img"
                            height="140"
                            // borderRadius="2rem"
                            image={
                              attraction.photo
                                ? attraction.photo.images.large.url
                                : `https://tripplannercs554.s3.amazonaws.com/AttractionImages/${Math.floor(
                                    Math.random() * 100 + 1,
                                  )}.jpg`
                            }
                            alt="green iguana"
                          />
                        </Grid>
                        <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                          {attraction.rating === 1 ? (
                            <StarIcon
                              sx={{
                                color: "primary.main",
                                "&.half": {
                                  color: "yellow",
                                  width: 20,
                                  height: 20,
                                },
                              }}
                            />
                          ) : attraction.rating === 2 ? (
                            <div>
                              <StarIcon
                                sx={{
                                  color: "primary.main",
                                  "&.half": {
                                    color: "yellow",
                                    width: 20,
                                    height: 20,
                                  },
                                }}
                              />
                              <StarIcon
                                sx={{
                                  color: "primary.main",
                                  "&.half": {
                                    color: "yellow",
                                    width: 20,
                                    height: 20,
                                  },
                                }}
                              />
                            </div>
                          ) : attraction.rating === 3 ? (
                            <div>
                              <StarIcon
                                sx={{
                                  color: "primary.main",
                                  "&.half": {
                                    color: "yellow",
                                    width: 20,
                                    height: 20,
                                  },
                                }}
                              />
                              <StarIcon
                                sx={{
                                  color: "primary.main",
                                  "&.half": {
                                    color: "yellow",
                                    width: 20,
                                    height: 20,
                                  },
                                }}
                              />
                              <StarIcon
                                sx={{
                                  color: "primary.main",
                                  "&.half": {
                                    color: "yellow",
                                    width: 20,
                                    height: 20,
                                  },
                                }}
                              />
                            </div>
                          ) : attraction.rating === 4 ? (
                            <div>
                              <StarIcon
                                sx={{
                                  color: "primary.main",
                                  "&.half": {
                                    color: "yellow",
                                    width: 20,
                                    height: 20,
                                  },
                                }}
                              />
                              <StarIcon
                                sx={{
                                  color: "primary.main",
                                  "&.half": {
                                    color: "yellow",
                                    width: 20,
                                    height: 20,
                                  },
                                }}
                              />
                              <StarIcon
                                sx={{
                                  color: "primary.main",
                                  "&.half": {
                                    color: "yellow",
                                    width: 20,
                                    height: 20,
                                  },
                                }}
                              />
                              <StarIcon
                                sx={{
                                  color: "primary.main",
                                  "&.half": {
                                    color: "yellow",
                                    width: 20,
                                    height: 20,
                                  },
                                }}
                              />
                            </div>
                          ) : attraction.rating === 5 ? (
                            <div>
                              <StarIcon
                                sx={{
                                  color: "primary.main",
                                  "&.half": {
                                    color: "yellow",
                                    width: 20,
                                    height: 20,
                                  },
                                }}
                              />
                              <StarIcon
                                sx={{
                                  color: "primary.main",
                                  "&.half": {
                                    color: "yellow",
                                    width: 20,
                                    height: 20,
                                  },
                                }}
                              />
                              <StarIcon
                                sx={{
                                  color: "primary.main",
                                  "&.half": {
                                    color: "yellow",
                                    width: 20,
                                    height: 20,
                                  },
                                }}
                              />
                              <StarIcon
                                sx={{
                                  color: "primary.main",
                                  "&.half": {
                                    color: "yellow",
                                    width: 20,
                                    height: 20,
                                  },
                                }}
                              />
                              <StarIcon
                                sx={{
                                  color: "primary.main",
                                  "&.half": {
                                    color: "yellow",
                                    width: 20,
                                    height: 20,
                                  },
                                }}
                              />
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </Stack>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
          <Grid
            item
            xs={12}
            style={{
              padding: "2rem",
            }}
          >
            <Typography variant="h6" component="h1" fontWeight={"bold"}>
              Top Hotels
            </Typography>
            <hr paddingright="2rem" />
          </Grid>
          {hotelsList.map((hotel) => {
            return (
              <Grid
                key={hotel.dupeId}
                item
                xs={12}
                style={{
                  padding: "2rem",
                  paddingTop: "0rem",
                  paddingRight: "2rem",
                }}
              >
                <Card sx={{ width: "100%" }}>
                  <CardActionArea>
                    <CardContent>
                      <Grid spacing={2} container>
                        <Grid item xs={1}>
                          <PlaceIcon />
                        </Grid>
                        <Grid item xs={9}>
                          <Typography
                            gutterBottom
                            variant="body1"
                            fontWeight="600"
                            component="div"
                          >
                            {hotel.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            style={styles.button}
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                          >
                            Save
                            <BookmarkBorderIcon sx={{ color: "white" }} />
                          </Button>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                navigate("/createtrip");
                                document.getElementById(
                                  "app-bar",
                                ).style.display = "block";
                              }}
                            >
                              <Typography variant="bidy1" fontWeight="800">
                                Create A Plan
                              </Typography>
                            </MenuItem>

                            {trips.map((trip, index) => (
                              <MenuItem key={index + 100}>
                                <Typography variant="caption">
                                  {`Trip to ${trip.destination.split(",")[0]}`}
                                </Typography>
                              </MenuItem>
                            ))}
                          </Menu>
                          <Grid item xs={12}></Grid>
                        </Grid>
                        <Grid container item xs={7}>
                          <Grid item xs={12}>
                            <Typography variant="bode2" fontWeight={"600"}>
                              Country:{" "}
                            </Typography>
                            <Typography variant="bode2">
                              {getCountryName(hotel.address.countryCode)}
                            </Typography>
                            <br />
                            <br />
                            <Typography variant="bode2" fontWeight={"600"}>
                              Amenities:{" "}
                            </Typography>
                            {hotel.amenities &&
                              hotel.amenities.length > 0 &&
                              hotel.amenities.map((amenity, index) => {
                                return (
                                  <Typography variant="bode2" key={index}>
                                    {amenity
                                      .split("_")
                                      .join(" ")
                                      .toLowerCase()
                                      .charAt(0)
                                      .toUpperCase() +
                                      amenity
                                        .split("_")
                                        .join(" ")
                                        .toLowerCase()
                                        .slice(1)}
                                    ,{" "}
                                  </Typography>
                                );
                              })}
                            <Typography variant="bode2"></Typography>
                            <br />
                            <br />
                            <Typography variant="bode2" fontWeight={"600"}>
                              Description:{" "}
                            </Typography>
                            <Typography variant="bode2">
                              {`${
                                hotel.description
                                  ? hotel.description
                                  : "No description available"
                              }`}
                            </Typography>
                            <br />
                            <br />
                            <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                              <Rating
                                name="read-only"
                                value={hotel.rating ? hotel.rating : 3}
                                readOnly
                              />
                            </Stack>
                          </Grid>
                        </Grid>
                        <Grid item xs={5} padding="2rem">
                          <CardMedia
                            sx={{ borderRadius: "0.5rem" }}
                            component="img"
                            height="140"
                            // borderRadius="2rem"
                            image={
                              hotel.image
                                ? hotel.image
                                : `https://tripplannercs554.s3.amazonaws.com/HotelImages/${Math.floor(
                                    Math.random() * 300 + 1,
                                  )}.jpg`
                            }
                            alt="green iguana"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
          <Grid
            item
            xs={12}
            style={{
              padding: "2rem",
            }}
          >
            <Typography variant="h6" component="h1" fontWeight={"bold"}>
              Top Restaurants
            </Typography>
            <hr paddingright="2rem" />
          </Grid>
          {restaurantsList.map((restaurant) => {
            return (
              <Grid
                key={restaurant.dupeId}
                item
                xs={12}
                style={{
                  padding: "2rem",
                  paddingTop: "0rem",
                  paddingRight: "2rem",
                }}
              >
                <Card sx={{ width: "100%" }}>
                  <CardActionArea>
                    <CardContent>
                      <Grid spacing={2} container>
                        <Grid item xs={1}>
                          <PlaceIcon />
                        </Grid>
                        <Grid item xs={9}>
                          <Typography
                            gutterBottom
                            variant="body1"
                            fontWeight="600"
                            component="div"
                          >
                            {restaurant.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            style={styles.button}
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                          >
                            Save
                            <BookmarkBorderIcon sx={{ color: "white" }} />
                          </Button>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                navigate("/createtrip");
                                document.getElementById(
                                  "app-bar",
                                ).style.display = "block";
                              }}
                            >
                              <Typography variant="bidy1" fontWeight="800">
                                Create A Plan
                              </Typography>
                            </MenuItem>

                            {trips.map((trip, index) => (
                              <MenuItem key={index + 100}>
                                <Typography variant="caption">
                                  {`Trip to ${trip.destination.split(",")[0]}`}
                                </Typography>
                              </MenuItem>
                            ))}
                          </Menu>
                          <Grid item xs={12}></Grid>
                        </Grid>
                        <Grid container item xs={7} textAlign="justify">
                          <Grid item xs={12}>
                            <Typography variant="bode2" fontWeight={"600"}>
                              Address:{" "}
                            </Typography>
                            <Typography variant="bode2">
                              {restaurant.address ? restaurant.address : "N/A"}
                            </Typography>
                            <br />
                            <br />
                            <Typography variant="bode2" fontWeight={"600"}>
                              Cuisine:{" "}
                            </Typography>
                            {restaurant.cuisine &&
                              restaurant.cuisine.length > 0 &&
                              restaurant.cuisine.map((cuisine, index) => {
                                return (
                                  <Typography variant="bode2" key={index}>
                                    {`| ${cuisine.name} |`}
                                  </Typography>
                                );
                              })}
                            <br />
                            <br />
                            <Typography variant="bode2" fontWeight={"600"}>
                              Price Level:{" "}
                            </Typography>
                            <Typography variant="bode2">
                              {`${
                                restaurant.price_level
                                  ? restaurant.price_level
                                  : "$$"
                              }`}
                            </Typography>
                            <br />
                            <br />
                            <Typography variant="bode2" fontWeight={"600"}>
                              Description:{" "}
                            </Typography>
                            <Typography variant="bode2">
                              {`${
                                restaurant.description
                                  ? restaurant.description
                                  : "No description available"
                              }`}
                            </Typography>
                            <br />
                            <br />
                            <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                              <Rating
                                name="read-only"
                                value={
                                  restaurant.rating ? restaurant.rating : 3
                                }
                                readOnly
                              />
                            </Stack>
                          </Grid>
                        </Grid>
                        <Grid item xs={5} padding="2rem">
                          <CardMedia
                            sx={{ borderRadius: "0.5rem" }}
                            component="img"
                            height="140"
                            // borderRadius="2rem"
                            image={
                              restaurant.photo
                                ? restaurant.photo.images.medium.url
                                : restaurant.image
                            }
                            alt="green iguana"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        {/* <Grid item xs={12} sm={12} md={5} lg={6}></Grid> */}
        {/* </Grid> */}
        {/* </Grid> */}
        <Grid item xs={12} sm={12} md={5} lg={6}>
          <Maps />
        </Grid>
      </Grid>
    );
  }
}

export default Search;
