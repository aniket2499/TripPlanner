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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  AppBar,
  Typography,
  Avatar,
} from "@mui/material";
import DisabledByDefaultTwoToneIcon from "@mui/icons-material/DisabledByDefaultTwoTone";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import actions from "../actions";
import getApiData from "../services/getApiData";
import Maps from "./Maps";

function Restaurants() {
  const dispatch = useDispatch();
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    async function getResData() {
      try {
        let data = await getApiData.getRestaurantData("London", 1, 4);
        if (data.length === 0) {
          return;
        }
        console.log(data);
        let resData = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].location_id.length != 8) {
            continue;
          }
          let restaurantObj = {
            name: data[i].name,
            address: data[i].address,
            rating: data[i].rating,
            priceLevel: data[i].price_level,
            latitude: data[i].latitude,
            longitude: data[i].longitude,
            image: data[i].image,
          };
          resData.push(restaurantObj);
        }
        setRestaurantData(resData);
      } catch (e) {
        console.log(e);
        return e;
      }
    }
    getResData();
  }, []);

  console.log("Restaurants.js");

  return <div></div>;
}

export default Restaurants;
