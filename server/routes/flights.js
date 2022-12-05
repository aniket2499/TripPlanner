const express = require("express");
const router = express.Router();
const getAllFlights = require("../data").flight;
// const { getAllFlights } = require("../data/flight");

router.get("/city/:city", async function (req, res, next) {
  try {
    console.log("req.params.city", req.params.city);
    const cities = await getAllFlights.getAllCities(req.params.city);
    console;
    res.status(200).json(cities);
  } catch (err) {
    next(err);
  }
});

router.get("/:origin/:dest/:date/:adults", async function (req, res, next) {
  try {
    const Parameters = await getAllFlights.getAllFlights(
      req.params.origin,
      req.params.dest,
      req.params.date,
      req.params.adults,
    );
    res.send(Parameters);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
