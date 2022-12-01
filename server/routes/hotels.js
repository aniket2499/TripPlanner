const express = require("express");
const router = express.Router();
const {
  getAllHotels,
  getHotelById,
  createHotel,
  deleteHotelById,
  updateHotelById,
  getHotelsFromApi,
} = require("../controllers/hotel");

router.get("/", getAllHotels);

router.get("/:id", getHotelById);

router.post("/", function (req, res) {
  createHotel;
});

router.delete("/:id", deleteHotelById);

router.patch("/:id", function (req, res) {
  updateHotelById;
});

module.exports = router;
