const Amadeus = require("amadeus");

const dataValidation = require("../validation/dataValidation");
const cityData = require("./base");
const redis = require("redis");
const axios = require("axios");
const dotenv = require("dotenv");
const client = redis.createClient(6379);
const path = require("path");
const { response } = require("express");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
client.connect();
const RESTAURANT_URL =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng";
const ATTRACTION_URL = "https://travel-advisor.p.rapidapi.com/attractions/list";
const API_KEY = process.env.API_KEY;
const amadeus = new Amadeus({
  clientId: process.env.API_FLIGHT_KEY,
  clientSecret: process.env.API_FLIGHT_SECRET,
});
const getAllRestaurant = async (location, pg, rating) => {
  const baseData = await cityData.getLocationsCoordinates(location);
  let latitude = baseData.lat;
  let longitude = baseData.lon;
  try {
    pg = dataValidation.checkPageNum(pg);
    pg = pg ? pg : "1";
    const cachedData = await client.hGet("cachedRestaurants", pg);
    if (cachedData) {
      console.log("Displaying Data from redis!!");
      return JSON.parse(cachedData);
    } else {
      const limit = 20;
      const offset = (pg - 1) * limit;
      let minimum_rating = rating ? rating : 3;

      try {
        const {
          data: { data },
        } = await axios.get(RESTAURANT_URL, {
          params: {
            latitude: latitude,
            longitude: longitude,
            limit: limit,
            offset: offset,
            distance: 10,
            lunit: "mi",
            min_rating: minimum_rating,
            lang: "en_US",
          },
          headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        });
        await client.hSet("cachedRestaurants", pg, JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllAttractions = async (location, pg, rating) => {
  const baseData = await cityData.getLocationsCoordinates(location);
  let latitude = baseData.lat;
  let longitude = baseData.lon;
  try {
    pg = dataValidation.checkPageNum(pg);
    pg = pg ? pg : "1";
    const cachedData = await client.hGet("cachedAttractions", pg);
    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      const limit = 20;
      const offset = (pg - 1) * limit;
      let minimum_rating = rating ? rating : 3;
      try {
        const {
          data: { data },
        } = await axios.get(ATTRACTION_URL, {
          params: {
            latitude: latitude,
            longitude: longitude,
            limit: limit,
            offset: offset,
            lunit: "mi",
            distance: 25,
            min_rating: minimum_rating,
            sort: "recommended",
            lang: "en_US",
          },
          headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        });
        await client.hSet("cachedAttractions", pg, JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllHotels = async (location, pg) => {
  try {
    pg = dataValidation.checkPageNum(pg);
    location = await cityData.getLocationsCoordinates(location);
    console.log(location);
    pg = pg ? pg : "1";
    let low = (pg - 1) * 5;
    let high = pg * 5;
    const cachedData = await client.hGet("cachedHotels", pg);

    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      try {
        const data = await amadeus.referenceData.locations.hotels.byGeocode.get(
          {
            latitude: location.lat,
            longitude: location.lon,
            radius: 50,
            radiusUnit: "MILE",
            hotelSource: "ALL",
          },
        );
        const hotelData = data.data;
        const hotelList = hotelData.slice(low, high);
        await client.hSet("cachedHotels", pg, JSON.stringify(hotelList));
        console.log(hotelList);
        return hotelList;
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// getAllRestaurant("chicago", "1");
getAllHotels("chicago", "1");
module.exports = {
  getAllRestaurant,
  getAllAttractions,
  getAllHotels,
};
