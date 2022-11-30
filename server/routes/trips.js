const express = require("express");
const router = express.Router();
const {
  getAllTrips,
  getTripById,
  createTrip,
  deleteTripById,
  updateTripById,
} = require("../controllers/trip");

router.get("/", getAllTrips);

router.get("/:id", getTripById);

router.post("/", function (req, res) {
  createTrip;
});

router.delete("/:id", deleteTripById);

router.patch("/:id", function (req, res) {
  updateTripById;
});

module.exports = router;
