import React from "react";
import GoogleMapReact from "google-map-react";
import RoomSharpIcon from "@mui/icons-material/RoomSharp";
import Chat from "./Chat";

const Maps = () => {
  const styles = {
    paper: {
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100px",
      borderRadius: "100",
    },
    mapContainer: {
      height: "90vh",
      width: "100%",
    },
    markerContainer: {
      position: "absolute",
      transform: "translate(-50%, -50%)",
      zIndex: 1,
      "&:hover": { zIndex: 2 },
    },
    pointer: {
      cursor: "pointer",
    },
  };

  const coords = { lat: 40.7127753, lng: -74.0059728 };
  // console.log(process.env.GOOGLE_API_KEY, "==");
  return (
    <div id="mapContainer" style={styles.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
        // defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        // options={""}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      ></GoogleMapReact>
    </div>
  );
};

export default Maps;
