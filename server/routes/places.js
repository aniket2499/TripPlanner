const express = require("express");
const router = express.Router();
const {
  getAllPlaces,
  getPlaceById,
  createPlace,
  deletePlaceById,
  updatePlaceById,
} = require("../controllers/place");

router.get("/", getAllPlaces);

router.get("/:id", getPlaceById);

router.post("/", function (req, res, next) {
  createPlace((req, res, next));
});

router.delete("/:id", deletePlaceById);

router.patch("/:id", function (req, res, next) {
  updatePlaceById((req, res, next));
});

module.exports = router;
