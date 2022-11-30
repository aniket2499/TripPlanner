const dataValidation = require("./validation.js");
const axios = require("axios");

require("dotenv").config();

const RESTAURANT_URL = "https://travel-advisor.p.rapidapi.com/restaurants/list";
const ATTRACTIONS_URL =
  "https://travel-advisor.p.rapidapi.com/attractions/list";

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
      },
      headers: {
        "X-RapidAPI-Key": "56d61d7538msh1377dd7969b00bcp1bbbb3jsn5ccba37e3cee",
        "X-RapidAPI-Host": process.env.API_KEY,
      },
    });
    console.log(data);
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
    } = await axios.get(ATTRACTIONS_URL, {
      params: {
        location_id: code,
        limit: limit,
        offset: offset,
        min_rating: minimum_rating,
        sort: "recommended",
      },
      headers: {
        "X-RapidAPI-Key": "56d61d7538msh1377dd7969b00bcp1bbbb3jsn5ccba37e3cee",
        "X-RapidAPI-Host": process.env.API_KEY,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllRestaurant, getAllAttractions };
