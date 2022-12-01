const dataValidation = require("../validation/dataValidation");
const redis = require("redis");
const axios = require("axios");
const dotenv = require("dotenv");
const client = redis.createClient(6379);
const path = require("path");
const { response } = require("express");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
client.connect();

const RESTAURANT_URL = "https://travel-advisor.p.rapidapi.com/restaurants/list";
const ATTRACTION_URL = "https://travel-advisor.p.rapidapi.com/attractions/list";
const HOTELS_URL = "https://travel-advisor.p.rapidapi.com/hotels/list";
const API_KEY = process.env.API_KEY;

const getAllRestaurant = async (code, pg, rating) => {
  code = dataValidation.checkLocationId(code);
  pg = dataValidation.checkPageNum(pg);
  pg = pg ? pg : "1";
  const cachedData = await client.hGet("cachedRestaurants", pg);
  if (cachedData) {
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
          location_id: code,
          limit: limit,
          offset: offset,
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
};

const getAllAttractions = async (code, pg, rating) => {
  code = dataValidation.checkLocationId(code);
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
          location_id: code,
          limit: limit,
          offset: offset,
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
};

const getAllHotels = async (code, pg) => {
  code = dataValidation.checkLocationId(code);
  pg = dataValidation.checkPageNum(pg);
  pg = pg ? pg : "1";
  const cachedData = await client.hGet("cachedHotels", pg);
  if (cachedData) {
    return JSON.parse(cachedData);
  } else {
    const limit = 20;
    const offset = (pg - 1) * limit;
    try {
      const {
        data: { data },
      } = await axios.get(HOTELS_URL, {
        params: {
          location_id: code,
          limit: limit,
          offset: offset,
          sort: "recommended",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      });
      await client.hSet("cachedHotels", pg, JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};

getAllHotels(187896, "1");
module.exports = { getAllRestaurant, getAllAttractions, getAllHotels };
