const dataValidation = require("../validation/dataValidation");
const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");
const { response } = require("express");
const aws = require("aws-sdk");
const { resolve } = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const SEARCH_URL = `http://api.positionstack.com/v1/forward?access_key=${process.env.POSITION_STACK_API_KEY}`;
const GOOGLE_URL =
  "https://maps.googleapis.com/maps/api/place/findplacefromtext/json";

const GOOGLE_PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
  region: process.env.REGION,
});

const getLocationsCoordinates = async (location) => {
  try {
    location = dataValidation.checkLocation(location);
    const data = await axios.get(
      SEARCH_URL + `&query=${location}` + `&limit=1`
    );
    if (!data.data.data[0]) {
      throw new Error("Enter a valid Location");
    } else {
      const obj = {
        lat: data.data.data[0].latitude,
        lon: data.data.data[0].longitude,
      };
      return obj;
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
    // console.log(data);
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
    location = dataValidation.checkLocation(location);
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

const getHotelPhotos = async (imageID) => {
  const params = {
    Bucket: process.env.BUCKET,
    Key: `HotelImages/${imageID}.jpg`,
  };
  try {
    s3.getObject(params, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        return data;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

getLocationsCoordinates("Chicago");

module.exports = {
  getLocationsCoordinates,
  getLocationDetails,
  getPhotos,
};
