const express = require("express");
const router = express.Router();
const { getAllFlights } = require("../controllers/flight");

router.get("/", getAllFlights);

module.exports = router;
