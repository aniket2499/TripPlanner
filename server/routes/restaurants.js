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

router.get("/", async (req, res) => {
  try {
    const restaurantsList = await getAllRestaurants();
    res.status(200).json(restaurantsList);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const restaurant = await getRestaurantById(req.params.id);
    res.status(200).json(restaurant);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.post("/create", async (req, res) => {
  try {
    const newRestaurant = await createRestaurant(req.body);
    res.status(200).json(newRestaurant);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedRestaurant = await deleteRestaurantById(req.params.id);
    res.status(200).json(deletedRestaurant);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const updatedRestaurant = await updateRestaurantById(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedRestaurant);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

module.exports = router;
