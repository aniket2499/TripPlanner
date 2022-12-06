const express = require("express");
const router = express.Router();
const {
  getAllTrips,
  getTripById,
  createTrip,
  deleteTripById,
  updateTripById,
  addAttractionToTrip,
  removeAttractionFromTrip,
  addHotelToTrip,
  removeHotelFromTrip,
  addRestaurantToTrip,
  removeRestaurantFromTrip,
  inviteUserToTrip,
  acceptTripInvite,
} = require("../controllers/trip");

router.get("/", getAllTrips);

router.get("/:id", getTripById);

router.post("/", function (req, res, next) {
  createTrip(req, res, next);
});

router.delete("/:id", deleteTripById);

router.patch("/:id", function (req, res, next) {
  updateTripById(req, res, next);
});

router.patch("/:id/attractions", function (req, res, next) {
  addAttractionToTrip(req, res, next);
});

router.patch("/:id/attractions/remove", function (req, res, next) {
  removeAttractionFromTrip(req, res, next);
});

router.patch("/:id/hotels", function (req, res, next) {
  addHotelToTrip(req, res, next);
});

router.patch("/:id/hotels/remove", function (req, res, next) {
  removeHotelFromTrip(req, res, next);
});

router.patch("/:id/restaurants", function (req, res, next) {
  addRestaurantToTrip(req, res, next);
});

router.patch("/:id/restaurants/remove", function (req, res, next) {
  removeRestaurantFromTrip(req, res, next);
});

router.patch("/:id/invite", function (req, res, next) {
  inviteUserToTrip(req, res, next);
});

router.patch("/:id/accept", function (req, res, next) {
  acceptTripInvite(req, res, next);
});

module.exports = router;
