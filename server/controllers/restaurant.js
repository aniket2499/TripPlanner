const Restaurant = require("../model/Restaurant");
const data = require("../data/data.js");
const validation = require("../validation/routesValidation");
const newValidation = require("../validation/dataValidation.js");

const getRestaurantById = async (req, res, next) => {
  try {
    validation.checkId(req.params.id, "Restaurant Id");
    const restaurant = await Restaurant.findById(req.params.id);
    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      throw {
        message: `Restaurant not found with ID: ${restaurant}`,
        status: 404,
      };
    }
    res.status(200).json(restaurant);
  } catch (err) {
    next(err);
  }
};

const getRestaurantsFromApi = async (req, res, next) => {
  try {
    let page = validation.checkPageNumber(req.params.pg);
    let location = newValidation.checkLocation(req.params.location);
    let rating = validation.checkReview(req.params.rating);
    page = page ? page : "1";
    rating = req.params.rating ? req.params.rating : "3.0";
    const restaurants = await data.getAllRestaurant(location, page, rating);
    res.status(200).json(restaurants);
  } catch (err) {
    next(err);
  }
};

const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    if (restaurants.length > 0) {
      res.status(200).json(restaurants);
    } else {
      throw {
        message: `No restaurants found`,
        status: 404,
      };
    }
  } catch (err) {
    next(err);
  }
};

const createRestaurant = async (req, res, next) => {
  console.log(req.body);
  const newRestaurant = new Restaurant(req.body);
  try {
    newRestaurant.location_id = validation.checkStringForNumber(
      newRestaurant.location_id,
      "Restaurant Id"
    );
    newRestaurant.name = validation.checkString(
      newRestaurant.name,
      "Restaurant Name"
    );
    newRestaurant.latitude = validation.checkStringForNumber(
      newRestaurant.latitude,
      "Restaurant Latitude"
    );
    newRestaurant.longitude = validation.checkStringForNumber(
      newRestaurant.longitude,
      "Restaurant Longitude"
    );
    newRestaurant.num_reviews = validation.checkStringForNumber(
      newRestaurant.num_reviews,
      "Restaurant Number of Reviews"
    );
    newRestaurant.address = validation.checkString(
      newRestaurant.address,
      "Restaurant Address"
    );
    newRestaurant.category = validation.checkString(
      newRestaurant.category,
      "Restaurant Category"
    );

    newRestaurant.image = validation.checkURL(
      newRestaurant.image,
      "Restaurant Image Url"
    );
    newRestaurant.web_url = validation.checkURL(
      newRestaurant.web_url,
      "Restaurant Web Url"
    );
    newRestaurant.cuisine = validation.checkStringArray(
      newRestaurant.cuisine,
      "Restaurant Cuisine"
    );
    newRestaurant.rating = validation.checkStringForNumber(
      newRestaurant.rating,
      "Restaurant Rating"
    );
    newRestaurant.price_level = validation.checkPriceLevel(
      newRestaurant.price_level,
      "Restaurant Price Level"
    );
    newRestaurant.description = validation.checkString(
      newRestaurant.description,
      "Restaurant Description"
    );
    newRestaurant.phone = validation.checkPhoneNumber(
      newRestaurant.phone,
      "Restaurant Phone"
    );
    newRestaurant.price = validation.checkPriceRange(
      newRestaurant.price,
      "Restaurant Price"
    );
    newRestaurant.website = validation.checkURL(
      newRestaurant.website,
      "Restaurant Website"
    );

    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    next(error);
  }
};

const updateRestaurantById = async (req, res, next) => {
  const newRestaurantInfo = req.body;
  let updatedRestaurant = {};
  try {
    validation.checkId(req.params.id, "Restaurant Id");
    if (newRestaurantInfo.location_id) {
      newRestaurantInfo.location_id = validation.checkStringForNumber(
        newRestaurantInfo.location_id,
        "Restaurant Id"
      );
    }
    if (newRestaurantInfo.name) {
      newRestaurantInfo.name = validation.checkString(
        newRestaurantInfo.name,
        "Restaurant Name"
      );
    }
    if (newRestaurantInfo.latitude) {
      newRestaurantInfo.latitude = validation.checkStringForNumber(
        newRestaurantInfo.latitude,
        "Restaurant Latitude"
      );
    }
    if (newRestaurantInfo.longitude) {
      newRestaurantInfo.longitude = validation.checkStringForNumber(
        newRestaurantInfo.longitude,
        "Restaurant Longitude"
      );
    }
    if (newRestaurantInfo.num_reviews) {
      newRestaurantInfo.num_reviews = validation.checkStringForNumber(
        newRestaurantInfo.num_reviews,
        "Restaurant Number of Reviews"
      );
    }
    if (newRestaurantInfo.address) {
      newRestaurantInfo.address = validation.checkString(
        newRestaurantInfo.address,
        "Restaurant Address"
      );
    }

    if (newRestaurantInfo.category) {
      newRestaurantInfo.category = validation.checkString(
        newRestaurantInfo.category,
        "Restaurant Category"
      );
    }
    if (newRestaurantInfo.image) {
      newRestaurantInfo.image = validation.checkURL(
        newRestaurantInfo.image,
        "Restaurant Image Url"
      );
    }
    if (newRestaurantInfo.web_url) {
      newRestaurantInfo.web_url = validation.checkURL(
        newRestaurantInfo.web_url,
        "Restaurant Web Url"
      );
    }
    if (newRestaurantInfo.cuisine) {
      newRestaurantInfo.cuisine = validation.checkStringArray(
        newRestaurantInfo.cuisine,
        "Restaurant Cuisine"
      );
    }
    if (newRestaurantInfo.rating) {
      newRestaurantInfo.rating = validation.checkStringForNumber(
        newRestaurantInfo.rating,
        "Restaurant Rating"
      );
    }
    if (newRestaurantInfo.price_level) {
      newRestaurantInfo.price_level = validation.checkStringForNumber(
        newRestaurantInfo.price_level,
        "Restaurant Price Level"
      );
    }
    if (newRestaurantInfo.description) {
      newRestaurantInfo.description = validation.checkString(
        newRestaurantInfo.description,
        "Restaurant Description"
      );
    }
    if (newRestaurantInfo.phone) {
      newRestaurantInfo.phone = validation.checkString(
        newRestaurantInfo.phone,
        "Restaurant Phone"
      );
    }
    if (newRestaurantInfo.price) {
      newRestaurantInfo.price = validation.checkString(
        newRestaurantInfo.price,
        "Restaurant Price"
      );
    }
    if (newRestaurantInfo.website) {
      newRestaurantInfo.website = validation.checkURL(
        newRestaurantInfo.website,
        "Restaurant Website"
      );
    }
    const oldRestaurant = await Restaurant.findById(req.params.id);
    if (
      newRestaurantInfo.location_id &&
      newRestaurantInfo.location_id !== oldRestaurant.location_id
    ) {
      updatedRestaurant.location_id = newRestaurantInfo.location_id;
    }
    if (
      newRestaurantInfo.name &&
      newRestaurantInfo.name !== oldRestaurant.name
    ) {
      updatedRestaurant.name = newRestaurantInfo.name;
    }
    if (
      newRestaurantInfo.latitude &&
      newRestaurantInfo.latitude !== oldRestaurant.latitude
    ) {
      updatedRestaurant.latitude = newRestaurantInfo.latitude;
    }
    if (
      newRestaurantInfo.longitude &&
      newRestaurantInfo.longitude !== oldRestaurant.longitude
    ) {
      updatedRestaurant.longitude = newRestaurantInfo.longitude;
    }
    if (
      newRestaurantInfo.num_reviews &&
      newRestaurantInfo.num_reviews !== oldRestaurant.num_reviews
    ) {
      updatedRestaurant.num_reviews = newRestaurantInfo.num_reviews;
    }
    if (
      newRestaurantInfo.address &&
      newRestaurantInfo.address !== oldRestaurant.address
    ) {
      updatedRestaurant.address = newRestaurantInfo.address;
    }
    if (
      newRestaurantInfo.category &&
      newRestaurantInfo.category !== oldRestaurant.category
    ) {
      updatedRestaurant.category = newRestaurantInfo.category;
    }
    if (
      newRestaurantInfo.image &&
      newRestaurantInfo.image !== oldRestaurant.image
    ) {
      updatedRestaurant.image = newRestaurantInfo.image;
    }
    if (
      newRestaurantInfo.web_url &&
      newRestaurantInfo.web_url !== oldRestaurant.web_url
    ) {
      updatedRestaurant.web_url = newRestaurantInfo.web_url;
    }
    console.log("old" + oldRestaurant.cuisine);
    console.log("new" + newRestaurantInfo.cuisine);
    if (
      JSON.stringify(newRestaurantInfo.cuisine) !==
      JSON.stringify(oldRestaurant.cuisine)
    ) {
      updatedRestaurant.cuisine = newRestaurantInfo.cuisine;
    }
    if (
      newRestaurantInfo.rating &&
      newRestaurantInfo.rating !== oldRestaurant.rating
    ) {
      updatedRestaurant.rating = newRestaurantInfo.rating;
    }

    if (
      newRestaurantInfo.price_level &&
      newRestaurantInfo.price_level !== oldRestaurant.price_level
    ) {
      updatedRestaurant.price_level = newRestaurantInfo.price_level;
    }

    if (
      newRestaurantInfo.description &&
      newRestaurantInfo.description !== oldRestaurant.description
    ) {
      updatedRestaurant.description = newRestaurantInfo.description;
    }

    if (
      newRestaurantInfo.phone &&
      newRestaurantInfo.phone !== oldRestaurant.phone
    ) {
      updatedRestaurant.phone = newRestaurantInfo.phone;
    }

    if (
      newRestaurantInfo.price &&
      newRestaurantInfo.price !== oldRestaurant.price
    ) {
      updatedRestaurant.price = newRestaurantInfo.price;
    }

    if (
      newRestaurantInfo.website &&
      newRestaurantInfo.website !== oldRestaurant.website
    ) {
      updatedRestaurant.website = newRestaurantInfo.website;
    }

    if (Object.keys(updatedRestaurant).length != 0) {
      console.log(Object.keys(updatedRestaurant));
      updatedRestaurant = await Restaurant.findByIdAndUpdate(
        req.params.id,
        updatedRestaurant,
        { new: true }
      );
      if (updatedRestaurant) {
        res.status(200).json(updatedRestaurant);
      } else {
        res.status(404).json({ message: "Restaurant not found" });
      }
    } else {
      res.status(400).json({ message: "No valid fields to update" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteRestaurantById = async (req, res, next) => {
  try {
    id = validation.checkId(req.params.id, "Restaurant ID");
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (restaurant) {
      res
        .status(200)
        .json(`Restaurant on ID (${req.params.id}) has been deleted...`);
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
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
