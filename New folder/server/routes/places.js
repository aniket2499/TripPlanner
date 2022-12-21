const express = require("express");
const router = express.Router();
const {
  getAllPlaces,
  getPlaceById,
  createPlace,
  deletePlaceById,
  updatePlaceById,
} = require("../controllers/place");

router.get("/", async (req, res) => {
  try {
    const placesList = await getAllPlaces();
    res.status(200).json(placesList);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const place = await getPlaceById(req.params.id);
    res.status(200).json(place);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.post("/create", async (req, res) => {
  try {
    const newPlace = await createPlace(req.body);
    res.status(200).json(newPlace);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedPlace = await deletePlaceById(req.params.id);
    res.status(r200).json(deletedPlace);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const updatedPlace = await updatePlaceById(req.params.id, req.body);
    res.status(200).json(updatedPlace);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

module.exports = router;
