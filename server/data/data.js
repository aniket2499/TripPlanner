const dataValidation = require("../validation/dataValidation");
const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const RESTAURANT_URL = "https://travel-advisor.p.rapidapi.com/restaurants/list";
const ATTRACTION_URL = "https://travel-advisor.p.rapidapi.com/attractions/list";
const HOTELS_URL = "https://travel-advisor.p.rapidapi.com/hotels/list";
const API_KEY = process.env.API_KEY;

const getAllRestaurant = async (code, pg, rating) => {
  code = dataValidation.checkLocationId(code);
  pg = dataValidation.checkPageNum(pg);
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
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAllAttractions = async (code, pg, rating) => {
  code = dataValidation.checkLocationId(code);
  pg = dataValidation.checkPageNum(pg);
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
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAllHotels = async (code, pg) => {
  code = dataValidation.checkLocationId(code);
  pg = dataValidation.checkPageNum(pg);
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
    return data;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getAllRestaurant, getAllAttractions, getAllHotels };
