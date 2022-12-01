const express = require("express");
const router = express.Router();
const {
  createAttraction,
  getAllAttractions,
  deleteAttractionById,
  updateAttractionById,
  getAttractionById,
  getAttractionsFromApi,
} = require("../controllers/attraction");

router.get("/", getAllAttractions);

router.get("/:id", getAttractionById);

router.get("/data/:code/:pg", getAttractionsFromApi);

router.post("/", function (req, res, next) {
  createAttraction(req, res, next);
});

router.delete("/:id", deleteAttractionById);

router.patch("/:id", function (req, res, next) {
  updateAttractionById(req, res, next);
});

module.exports = router;
