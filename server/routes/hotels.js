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

router.get("/data/:location/:pg", getHotelsFromApi);

router.post("/", function (req, res, next) {
  createHotel(req, res, next);
});

router.delete("/:id", deleteHotelById);

router.patch("/:id", function (req, res, next) {
  updateHotelById(req, res, next);
});

module.exports = router;
