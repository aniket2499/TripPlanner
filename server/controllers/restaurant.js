const Restaurant = require("../model/Restaurant");
const data = require("../data/data.js");

const getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.status(200).json(restaurant);
  } catch (err) {
    next(err);
  }
};

const getRestaurantsFromApi = async (req, res, next) => {
  let page = req.params.pg;
  let location_code = req.params.code;
  try {
    console.log("here");
    const restaurants = await data.getAllRestaurant(location_code, page);
    res.status(200).json(restaurants);
  } catch (err) {
    next(err);
  }
};

const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (err) {
    next(err);
  }
};

const createRestaurant = async (req, res, next) => {
  const newRestaurant = new Restaurant(req.body);

  try {
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    next(err);
  }
};

const updateRestaurantById = async (req, res, next) => {
  try {
    const updateRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateRestaurant);
  } catch (err) {
    next(err);
  }
};

const deleteRestaurantById = async (req, res, next) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json(`Restaurant on ID (${req.params.id}) has been deleted...`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRestaurantById,
  getAllRestaurants,
  createRestaurant,
  updateRestaurantById,
  deleteRestaurantById,
  getRestaurantsFromApi,
};
