const Amadeus = require("amadeus");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const amadeus = new Amadeus({
  clientId: process.env.API_FLIGHT_KEY,
  clientSecret: process.env.API_FLIGHT_SECRET,
});

const getAllFlights = async (Parameters) => {
  try {
    const arrivalFlights = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: Parameters.From,
      destinationLocationCode: Parameters.To,
      departureDate: Parameters.FromDate,
      returnDate: Parameters.EndDate,
      adults: "1",
      max: "40",
    });
    return arrivalFlights.data;
  } catch (err) {
    throw err;
  }
};

const getAllCities = async (city) => {
  try {
    const cities = await amadeus.referenceData.locations.get({
      keyword: city,
      subType: "AIRPORT,CITY",
    });
    return cities.data;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllFlights,
  getAllCities,
};
