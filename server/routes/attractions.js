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

router.get("/", async (req, res) => {
  try {
    const attractionsList = await getAllAttractions();
    res.status(200).json(attractionsList);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const attraction = await getAttractionById(req.params.id);
    res.status(200).json(attraction);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/data/:location/:pg/:rating", getAttractionsFromApi);

router.post("/create", async (req, res) => {
  try {
    const newAttraction = await createAttraction(req.body);
    res.status(200).json(newAttraction);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedAttraction = await deleteAttractionById(req.params.id);
    res.status(200).json(deletedAttraction);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const updatedAttraction = await updateAttractionById(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedAttraction);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
