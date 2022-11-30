const express = require("express");
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  deleteRestaurantById,
  updateRestaurantById,
} = require("../controllers/restaurant");

router.get("/", getAllRestaurants);

router.get("/:id", getRestaurantById);

router.post("/", function (req, res) {
  createRestaurant;
});

router.delete("/:id", deleteRestaurantById);

router.patch("/:id", function (req, res) {
  updateRestaurantById;
});

module.exports = router;
