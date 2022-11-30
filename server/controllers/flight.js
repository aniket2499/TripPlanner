const Amadeus = require("amadeus");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const amadeus = new Amadeus({
  clientId: process.env.API_KEY,
  clientSecret: process.env.API_SECRET,
});

const getAllFlights = async (req, res, next) => {
  try {
    const flights = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: "SYD",
      destinationLocationCode: "BKK",
      departureDate: "2023-06-01",
      adults: "1",
      max: "40",
    });
    res.status(200).json(JSON.parse(flights.body));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllFlights,
};
