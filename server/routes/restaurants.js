const express = require("express");
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  deleteRestaurantById,
  updateRestaurantById,
  getRestaurantsFromApi,
} = require("../controllers/restaurant");

router.get("/data/:location/:pg/:rating", getRestaurantsFromApi);

router.get("/", getAllRestaurants);

router.get("/:id", getRestaurantById);

router.post("/", function (req, res, next) {
  createRestaurant(req, res, next);
});

router.delete("/:id", deleteRestaurantById);

router.patch("/:id", function (req, res, next) {
  updateRestaurantById(req, res, next);
});

module.exports = router;
