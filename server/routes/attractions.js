const express = require("express");
const router = express.Router();
const {
  createAttraction,
  getAllAttractions,
  deleteAttractionById,
  updateAttractionById,
  getAttractionById,
} = require("../controllers/attraction");

router.get("/", getAllAttractions);

router.get("/:id", getAttractionById);

router.post("/", function (req, res) {
  createAttraction;
});

router.delete("/:id", deleteAttractionById);

router.patch("/:id", function (req, res) {
  updateAttractionById;
});

module.exports = router;
