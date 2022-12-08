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

router.get("/", async (req, res) => {
  try {
    const hotelsList = await getAllHotels();
    res.status(200).json(hotelsList);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const hotel = await getHotelById(req.params.id);
    res.status(200).json(hotel);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.get("/data/:location/:pg", getHotelsFromApi);

router.post("/create", async (req, res) => {
  try {
    const newHotel = await createHotel(req.body);
    res.status(200).json(newHotel);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedHotel = await deleteHotelById(req.params.id);
    res.status(200).json(deletedHotel);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const updatedHotel = await updateHotelById(req.params.id, req.body);
    res.status(200).json(updatedHotel);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

module.exports = router;
