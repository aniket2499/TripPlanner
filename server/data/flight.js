const Amadeus = require("amadeus");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../server/.env") });
const amadeus = new Amadeus({
  clientId: process.env.API_FLIGHT_KEY,
  clientSecret: process.env.API_FLIGHT_SECRET,
});

const getAllFlights = async (Parameters) => {
  try {
    const arrivalFlights = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: Parameters.origin,
      destinationLocationCode: Parameters.dest,
      departureDate: "2023-06-01",
      adults: Parameters.adults,
      max: "40",
    });

    let arrivalFlightData = arrivalFlights.data;
    let updatedFlightData = [];

    for (let i = 0; i < arrivalFlightData.length; i++) {
      let flight = arrivalFlightData[i];
      let flightPrice = {};
      flightPrice["flightpriceAmount"] = flight.price.total;
      flightPrice["flightpriceCurrency"] = flight.price.currency;
      let flightItinerary = flight.itineraries;
      let flightNumberOfBookableSeats = flight.numberOfBookableSeats;

      let flightDataObj = {
        flightPrice,
        flightItinerary,
        flightNumberOfBookableSeats,
      };
      updatedFlightData.push(flightDataObj);
    }

    const departureFlights = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: Parameters.origin,
      destinationLocationCode: Parameters.dest,
      departureDate: "2023-06-01",
      adults: Parameters.adults,
      max: "40",
    });

    let departureFlightData = departureFlights.data;
    let departureUpdatedFlightData = [];

    for (let i = 0; i < departureFlightData.length; i++) {
      let flight = departureFlightData[i];
      let flightPrice = {};

      flightPrice["flightPriceAmount"] = flight.price.total;
      flightPrice["flightPriceCurrency"] = flight.price.currency;
      let flightItinerary = flight.itineraries;
      let flightNumberOfBookableSeats = flight.numberOfBookableSeats;
      let flightDataObj = {
        flightprice: flightPrice,
        flightitinerary: flightItinerary,
        flightNumberOfBookableSeats,
      };
      departureUpdatedFlightData.push(flightDataObj);
    }

    let obj = {};
    obj["arrivalFlights"] = updatedFlightData;
    obj["departureFlights"] = departureUpdatedFlightData;

    res.status(200).json(obj);
  } catch (err) {
    throw err;
  }
};

const getAllCities = async (city) => {
  try {
    console.log(process.env.API_FLIGHT_KEY);

    // const cities = await amadeus.referenceData.locations.get({
    //   keyword: city,
    //   subType: ["CITY"],
    // });
    console.log(cities);
    res.status(200).json(cities.data);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllFlights,
  getAllCities,
};
