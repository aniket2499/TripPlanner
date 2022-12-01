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
    const arrivalflights = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: req.params.originLocationCode,
      destinationLocationCode: req.params.destinationLocationCode,
      departureDate: req.params.departureDate,
      adults: "1",
      max: "40",
    });
    let arrivalflightData = arrivalflights.data;
    let updatedflightData = [];
    console.log(arrivalflightData);
    for (let i = 0; i < arrivalflightData.length; i++) {
      let flight = arrivalflightData[i];
      console.log(flight);
      let flightprice = {};
      flightprice["flightpriceAmount"] = flight.price.total;
      flightprice["flightpriceCurrency"] = flight.price.currency;
      let flightitinerary = flight.itineraries;
      let flightnumberofbookableseats = flight.numberOfBookableSeats;
      let flightDataObj = {
        flightprice,
        flightitinerary,
        flightnumberofbookableseats,
      };
      updatedflightData.push(flightDataObj);
    }
    const departureflights = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: req.params.originLocationCode,
      destinationLocationCode: req.params.destinationLocationCode,
      departureDate: req.params.departureDate,
      adults: "1",
      max: "40",
    });
    let departureflightData = departureflights.data;
    let departureupdatedflightData = [];
    console.log(departureflightData);
    for (let i = 0; i < departureflightData.length; i++) {
      let flight = departureflightData[i];
      console.log(flight);
      let flightprice = {};
      flightprice["flightpriceAmount"] = flight.price.total;
      flightprice["flightpriceCurrency"] = flight.price.currency;
      let flightitinerary = flight.itineraries;
      let flightnumberofbookableseats = flight.numberOfBookableSeats;
      let flightDataObj = {
        flightprice,
        flightitinerary,
        flightnumberofbookableseats,
      };
      departureupdatedflightData.push(flightDataObj);
    }
    let obj = {};
    obj["arrivalflights"] = updatedflightData;
    obj["departureflights"] = departureupdatedflightData;

    res.status(200).json(obj);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllFlights,
};
