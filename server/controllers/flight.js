const Amadeus = require("amadeus");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const amadeus = new Amadeus({
  clientId: process.env.API_FLIGHT_KEY,
  clientSecret: process.env.API_FLIGHT_SECRET,
});

const getAllFlights = async (req, res, next) => {
  try {
    console.log("entered");
    console.log(req.params);
    // console.log(req.query.originLocationCode);
    const arrivalFlights = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: req.params.origin,
      destinationLocationCode: req.params.dest,
      departureDate: req.params.date,
      adults: req.params.adults,
      max: "40",
    });
    let arrivalFlightData = arrivalFlights.data;
    let updatedFlightData = [];
    // console.log(arrivalFlightData);
    for (let i = 0; i < arrivalFlightData.length; i++) {
      let flight = arrivalFlightData[i];
      // console.log(flight);
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
      originLocationCode: req.params.origin,
      destinationLocationCode: req.params.dest,
      departureDate: req.params.date,
      adults: req.params.adults,
      max: "40",
    });
    let departureFlightData = departureFlights.data;
    let departureUpdatedFlightData = [];
    console.log(departureFlightData);
    for (let i = 0; i < departureFlightData.length; i++) {
      let flight = departureFlightData[i];
      console.log(flight);
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
    next(err);
  }
};

module.exports = {
  getAllFlights,
};
