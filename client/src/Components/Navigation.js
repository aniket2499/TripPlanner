import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import { Link, Link as RouterLink, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Autocomplete } from "@react-google-maps/api";
import SearchIcon from "@mui/icons-material/Search";
import $ from "jquery";
import "../App.css";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import MenuIcon from "@mui/icons-material/Menu";
import { doChangePassword, doSignOut } from "../firebase/FirebaseFunctions";
import Search from "./Search";

import {
  Toolbar,
  AppBar,
  IconButton,
  Drawer,
  MenuItem,
  Typography,
  Button,
  Grid,
  Menu,
  Box,
  Tooltip,
  Avatar,
  Modal,
  TextField,
} from "@mui/material";
import { style } from "@mui/system";

const styles = {
  header: {
    backgroundColor: "#fafafa",
    boxShadow: "none",
    position: "fixed",
    color: "#d14000",
    paddingRight: "9.5rem",
    paddingLeft: "9.5rem",
    "@media (maxWidth: 900px)": {
      paddingLeft: 0,
    },
  },
  nonAuthHeader: {
    backgroundColor: "transparent",
    boxShadow: "none",
    position: "fixed",
    color: "#d14000",
    paddingRight: "9.5rem",
    paddingLeft: "9.5rem",
    "@media (maxWidth: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontWeight: 600,
    textAlign: "left",
    paddingLeft: "10px",
  },
  menuButton: {
    fontWeight: 700,
    size: "18px",
    marginLeft: "25px",
  },
  toolbar: {
    display: "flex",
    // justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
    backgroundColor: "#fafafa",
    color: "#black",
    textTransform: "none",
  },
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "#fafafa",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
  },
  box: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 450,
    alignItems: "center",
    margin: "2rem",
    marginTop: "1.5rem",
    padding: "2rem",
    border: "1px solid #c0c0c0",
    borderRadius: "15px",
  },
  modalheader: {
    padding: "0.5rem",
    textAlign: "center",
  },
};

const headersData = [
  {
    label: "Dashboard",
    href: "/home",
  },
  {
    label: "Flights",
    href: "/flights",
  },
  // {
  //   label: "My Account",
  //   href: "/account",
  // },
];

const nonAuthHeadersData = [
  {
    label: "Login",
    href: "/login",
  },
  {
    label: "Sign Up",
    href: "/signup",
  },
];

const drawersData = [
  {
    label: "Dashboard",
    href: "/home",
  },
  {
    label: "Flights",
    href: "/flights",
  },
  {
    label: "My Account",
    href: "/account",
  },
  {
    label: "Change Password",
    href: "/change-password",
  },
];

const nonAuthDrawersData = [
  {
    label: "Log In",
    href: "/login",
  },
  {
    label: "Sign Up",
    href: "/signup",
  },
];

const Navigation = () => {
  const [state, setState] = useState({ mobileView: false, drawerOpen: false });
  const { mobileView, drawerOpen } = state;
  const navigate = useNavigate();
  const currentUser = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const [coords, setCoords] = useState({});
  const [destination, setDestination] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [passwordMatch, setPasswordMatch] = useState("");
  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    // console.log(lat, lng);
    setCoords({ lat, lng });
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({
            ...prevState,
            mobileView: true,
            setOpen: false,
            setAnchorElUser: false,
          }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const timer = setTimeout(() => {
        console.log(searchTerm);
        // navigate(`/search/${searchTerm}`);
        return navigate(`/search/searchTerm`, {
          state: {
            longitude: coords.lng,
            latitude: coords.lat,
          },
        });
      }, 500);

      return () => {
        clearTimeout(timer);
        // setSearchTerm("");
      };
    } else {
      // navigate(`/home`);
    }
  }, [searchTerm]);

  const submitForm = async (e) => {
    e.preventDefault();
    const { currentPassword, newPasswordOne, newPasswordTwo } =
      e.target.elements;

    if (newPasswordOne.value !== newPasswordTwo.value) {
      document.getElementById("error").innerHTML = "Passwords do not match";
    }

    try {
      await doChangePassword(
        currentUser.email,
        currentPassword.value,
        newPasswordOne.value,
      );
      // alert("Password has been changed, you will now be logged out");
      setOpen(false);
      await doSignOut();
      navigate("/login");
    } catch (error) {
      document.getElementById("error").innerHTML = error.message;
    }
  };

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: "#d14000",
        width: 32,
        height: 32,
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }

  const displayDesktop = () => {
    return (
      <Toolbar style={styles.toolbar} className="toolbar">
        {tripPlanner}
        <div style={{ display: "flex" }}>
          <form
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              setSearchTerm(e.target.value);
            }}
            name="formName"
            className="center"
          >
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <TextField
                id="search-box"
                label="Search"
                variant="outlined"
                style={{
                  marginTop: "0.5rem",
                  width: "12rem",
                }}
              />
            </Autocomplete>
          </form>

          {getMenuButtons()}
          <Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              {...stringAvatar(
                currentUser._delegate.displayName
                  ? currentUser._delegate.displayName
                  : "Unknown",
              )}
            />
          </Button>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {/* {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))} */}
            <MenuItem key={"name"}>
              <Typography textAlign="center" sx={{ fontWeight: 800 }}>
                Welcome, {currentUser._delegate.displayName}
              </Typography>
            </MenuItem>

            <MenuItem key={"email"}>
              <Typography textAlign="center">
                {currentUser._delegate.email}
              </Typography>
            </MenuItem>

            <MenuItem
              key={"change-password"}
              onClick={() => {
                handleOpen();
                handleCloseUserMenu();
              }}
            >
              <Typography textAlign="center">Change Password</Typography>
            </MenuItem>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box style={styles.modalStyle}>
                <Typography
                  variant="h3"
                  component="h1"
                  style={styles.modalheader}
                  gutterBottom
                >
                  Change Password
                </Typography>
                <Grid style={styles.box}>
                  {passwordMatch && <h4 className="error">{passwordMatch}</h4>}

                  <form onSubmit={submitForm}>
                    <Grid className="form-group">
                      <TextField
                        margin="normal"
                        className="form-control"
                        name="currentPassword"
                        id="currentPassword"
                        type="password"
                        placeholder="Current Password"
                        autoComplete="off"
                        required
                      />
                    </Grid>

                    <Grid className="form-group">
                      <TextField
                        margin="normal"
                        className="form-control"
                        name="newPasswordOne"
                        id="newPasswordOne"
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                        required
                      />
                    </Grid>
                    <Grid className="form-group">
                      <TextField
                        margin="normal"
                        className="form-control"
                        name="newPasswordTwo"
                        id="newPasswordTwo"
                        type="password"
                        placeholder="Confirm Password"
                        autoComplete="off"
                        required
                      />
                    </Grid>
                    <Typography
                      variant="body2"
                      id="error"
                      color="red"
                    ></Typography>
                    <Button type="submit" style={{ marginTop: "2rem" }}>
                      Change Password
                    </Button>
                  </form>

                  <br />
                </Grid>
              </Box>
            </Modal>

            <MenuItem
              key={"logout"}
              onClick={() => {
                handleCloseUserMenu();
                doSignOut();
              }}
            >
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div style={styles.drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div>TripPlanner</div>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <TextField
            id="search-box"
            label="Search"
            variant="outlined"
            style={{
              marginTop: "0.5rem",
              width: "12rem",
              marginLeft: "2rem",
            }}
          />
        </Autocomplete>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return drawersData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const tripPlanner = (
    <Button
      disableRipple
      onClick={() => navigate("/home")}
      sx={{
        "&:hover": { backgroundColor: "transparent" },
      }}
    >
      <div className="header-app-logo">
        <TravelExploreIcon />
        <Typography style={styles.logo} textTransform="none">
          TripPlanner
        </Typography>
      </div>
    </Button>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            style: styles.menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  const nonAuthDisplayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div style={styles.drawerContainer}>{getNonAuthDrawerChoices()}</div>
        </Drawer>

        <div>TripPlanner</div>
      </Toolbar>
    );
  };

  const nonAuthDisplayDesktop = () => {
    return (
      <Toolbar style={styles.toolbar} className="toolbar">
        {nonAuthTripPlanner}
        <div>
          {getNonAuthMenuButtons()}
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {/* {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))} */}
            <MenuItem key={"name"}>
              <Typography textAlign="center" sx={{ fontWeight: 800 }}>
                Welcome,
              </Typography>
            </MenuItem>

            <MenuItem key={"email"}>
              <Typography textAlign="center">email</Typography>
            </MenuItem>

            <MenuItem
              key={"change-password"}
              onClick={() => {
                handleOpen();
                handleCloseUserMenu();
              }}
            >
              <Typography textAlign="center">Change Password</Typography>
            </MenuItem>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box style={styles.modalStyle}>
                <Typography
                  variant="h3"
                  component="h1"
                  style={styles.modalheader}
                  gutterBottom
                >
                  Change Password
                </Typography>
                <Grid style={styles.box}>
                  {passwordMatch && <h4 className="error">{passwordMatch}</h4>}

                  <form onSubmit={submitForm}>
                    <Grid className="form-group">
                      <TextField
                        margin="normal"
                        className="form-control"
                        name="currentPassword"
                        id="currentPassword"
                        type="password"
                        placeholder="Current Password"
                        autoComplete="off"
                        required
                      />
                    </Grid>

                    <Grid className="form-group">
                      <TextField
                        margin="normal"
                        className="form-control"
                        name="newPasswordOne"
                        id="newPasswordOne"
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                        required
                      />
                    </Grid>
                    <Grid className="form-group">
                      <TextField
                        margin="normal"
                        className="form-control"
                        name="newPasswordTwo"
                        id="newPasswordTwo"
                        type="password"
                        placeholder="Confirm Password"
                        autoComplete="off"
                        required
                      />
                    </Grid>
                    <Typography
                      variant="body2"
                      id="error"
                      color="red"
                    ></Typography>
                    <Button type="submit" style={{ marginTop: "2rem" }}>
                      Change Password
                    </Button>
                  </form>

                  <br />
                </Grid>
              </Box>
            </Modal>

            <MenuItem
              key={"logout"}
              onClick={() => {
                handleCloseUserMenu();
              }}
            >
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    );
  };

  const getNonAuthDrawerChoices = () => {
    return nonAuthDrawersData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const nonAuthTripPlanner = (
    <Button
      disableRipple
      onClick={() => navigate("/")}
      sx={{
        "&:hover": { backgroundColor: "transparent" },
      }}
    >
      <div className="header-app-logo">
        <TravelExploreIcon />
        <Typography style={styles.logo} textTransform="none">
          TripPlanner
        </Typography>
      </div>
    </Button>
  );

  const getNonAuthMenuButtons = () => {
    return nonAuthHeadersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            style: styles.menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  if (currentUser) {
    return (
      <header>
        <AppBar style={styles.header} id="app-bar">
          {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
      </header>
    );
  } else {
    return (
      <header>
        <AppBar style={styles.nonAuthHeader} id="app-bar">
          {mobileView ? nonAuthDisplayMobile() : nonAuthDisplayDesktop()}
        </AppBar>
      </header>
    );
  }
  // return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

export default Navigation;
