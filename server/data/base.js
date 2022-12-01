const dataValidation = require("../validation/dataValidation");
const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");
const { response } = require("express");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const SEARCH_URL = `http://api.positionstack.com/v1/forward?access_key=${process.env.POSITION_STACK_API_KEY}`;
const GOOGLE_URL =
  "https://maps.googleapis.com/maps/api/place/findplacefromtext/json";

const GOOGLE_PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo";

const getLocationsCoordinates = async (location) => {
  try {
    location = dataValidation.checkLocation(location);
    const data = await axios.get(
      SEARCH_URL + `&query=${location}` + `&limit=1`
    );
    if (!data.data.data[0]) {
      throw new Error("Enter a valid Location");
    } else {
      const { latitude, longitude } = data.data.data[0];
      return { lat: latitude, lon: longitude };
    }
  } catch (error) {
    console.log(error);
  }
};

const getLocationDetails = async (location) => {
  try {
    location = dataValidation.checkLocation(location);
    const data = await axios.get(
      GOOGLE_URL +
        `?input=${location}` +
        `&key=${process.env.GOOGLE_API_KEY}` +
        `&inputtype=textquery` +
        `&fields=name,photos`
    );
    if (!data.data.candidates[0]) {
      throw new Error("Enter a valid Location");
    }
    return {
      name: data.data.candidates[0].name,
      photo_reference: data.data.candidates[0].photos[0].photo_reference,
    };
  } catch (error) {
    console.log(error);
  }
};

const getPhotos = async (location) => {
  try {
    const data = await getLocationDetails(location);
    if (!data.photo_reference) {
      throw new Error("No photos available for this location");
    }
    const photo_reference = data.photo_reference;
    try {
      location = dataValidation.checkLocation(location);
      const data = await axios.get(
        GOOGLE_PHOTO_URL +
          `?photoreference=${photo_reference}` +
          `&key=${process.env.GOOGLE_API_KEY}` +
          `&maxwidth=400` +
          `&maxheight=400`
      );

      return data.config.url;
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

getPhotos("Neemuch");

module.exports = {
  getLocationsCoordinates,
};
