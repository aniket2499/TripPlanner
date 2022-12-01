const express = require("express");
const router = express.Router();
const { getAllFlights } = require("../controllers/flight");

router.get("/:origin/:dest/:date/:adults", getAllFlights);

module.exports = router;
