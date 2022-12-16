const Restaurant = require("../model/Restaurant");
const data = require("../data/data.js");
const validation = require("../validation/routesValidation");
const newValidation = require("../validation/dataValidation.js");
const Trip = require("../model/Trip");

const getRestaurantById = async (id) => {
  let parsedId = validation.toObjectId(id, "RestaurantId");
  const restaurant = await Restaurant.findById(parsedId);
  if (restaurant) {
    return restaurant;
  } else {
    throw {
      message: `Restaurant not found with ID: ${restaurant}`,
      status: 404,
    };
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

const getAllRestaurants = async () => {
  const restaurantsList = await Restaurant.find();
  if (restaurantsList.length > 0) {
    return restaurantsList;
  } else {
    throw {
      message: `No restaurants found`,
      status: 404,
    };
  }
};

const createRestaurant = async (restaurantBody, id) => {
  const tripId = id;
  const trip = await Trip.findById(tripId);
  const newRestaurantInfo = new Restaurant(restaurantBody);
  newRestaurantInfo.location_id = validation.checkStringForNumber(
    newRestaurantInfo.location_id,
    "Restaurant Id",
  );
  newRestaurantInfo.name = validation.checkString(
    newRestaurantInfo.name,
    "Restaurant Name",
  );
  newRestaurantInfo.latitude = validation.checkStringForNumber(
    newRestaurantInfo.latitude,
    "Restaurant Latitude",
  );
  newRestaurantInfo.longitude = validation.checkStringForNumber(
    newRestaurantInfo.longitude,
    "Restaurant Longitude",
  );
  newRestaurantInfo.num_reviews = validation.checkStringForNumber(
    newRestaurantInfo.num_reviews,
    "Restaurant Number of Reviews",
  );
  newRestaurantInfo.address = validation.checkString(
    newRestaurantInfo.address,
    "Restaurant Address",
  );
  newRestaurantInfo.category = validation.checkString(
    newRestaurantInfo.category,
    "Restaurant Category",
  );

  newRestaurantInfo.image = validation.checkURL(
    newRestaurantInfo.image,
    "Restaurant Image Url",
  );
  newRestaurantInfo.web_url = validation.checkURL(
    newRestaurantInfo.web_url,
    "Restaurant Web Url",
  );
  newRestaurantInfo.cuisine = validation.checkStringArray(
    newRestaurantInfo.cuisine,
    "Restaurant Cuisine",
  );
  newRestaurantInfo.rating = validation.checkStringForNumber(
    newRestaurantInfo.rating,
    "Restaurant Rating",
  );
  newRestaurantInfo.price_level = validation.checkPriceLevel(
    newRestaurantInfo.price_level,
    "Restaurant Price Level",
  );
  newRestaurantInfo.description = validation.checkString(
    newRestaurantInfo.description,
    "Restaurant Description",
  );
  newRestaurantInfo.phone = validation.checkPhoneNumber(
    newRestaurantInfo.phone,
    "Restaurant Phone",
  );
  newRestaurantInfo.price = validation.checkPriceRange(
    newRestaurantInfo.price,
    "Restaurant Price",
  );
  newRestaurantInfo.website = validation.checkURL(
    newRestaurantInfo.website,
    "Restaurant Website",
  );

  const savedRestaurant = await newRestaurantInfo.save();
  trip.restaurants.push(savedRestaurant);
  await trip.save();

  if (savedRestaurant) {
    return savedRestaurant;
  } else {
    throw {
      message: `Restaurant not saved`,
      status: 404,
    };
  }
};

const updateRestaurantById = async (id, updateRestaurantBody) => {
  let parsedId = validation.toObjectId(id, "RestaurantId");
  const restaurant = await Restaurant.findById(parsedId);
  if (!restaurant) {
    throw {
      message: `Restaurant not found with ID: ${id}`,
      status: 404,
    };
  } else {
    const newRestaurantInfo = updateRestaurantBody;
    let updatedRestaurant = {};

    id = validation.checkId(id, "Restaurant Id");
    if (newRestaurantInfo.location_id) {
      newRestaurantInfo.location_id = validation.checkStringForNumber(
        newRestaurantInfo.location_id,
        "Restaurant Id",
      );
    }
    if (newRestaurantInfo.name) {
      newRestaurantInfo.name = validation.checkString(
        newRestaurantInfo.name,
        "Restaurant Name",
      );
    }
    if (newRestaurantInfo.latitude) {
      newRestaurantInfo.latitude = validation.checkStringForNumber(
        newRestaurantInfo.latitude,
        "Restaurant Latitude",
      );
    }
    if (newRestaurantInfo.longitude) {
      newRestaurantInfo.longitude = validation.checkStringForNumber(
        newRestaurantInfo.longitude,
        "Restaurant Longitude",
      );
    }
    if (newRestaurantInfo.num_reviews) {
      newRestaurantInfo.num_reviews = validation.checkStringForNumber(
        newRestaurantInfo.num_reviews,
        "Restaurant Number of Reviews",
      );
    }
    if (newRestaurantInfo.address) {
      newRestaurantInfo.address = validation.checkString(
        newRestaurantInfo.address,
        "Restaurant Address",
      );
    }

    if (newRestaurantInfo.category) {
      newRestaurantInfo.category = validation.checkString(
        newRestaurantInfo.category,
        "Restaurant Category",
      );
    }
    if (newRestaurantInfo.image) {
      newRestaurantInfo.image = validation.checkURL(
        newRestaurantInfo.image,
        "Restaurant Image Url",
      );
    }
    if (newRestaurantInfo.web_url) {
      newRestaurantInfo.web_url = validation.checkURL(
        newRestaurantInfo.web_url,
        "Restaurant Web Url",
      );
    }
    if (newRestaurantInfo.cuisine) {
      newRestaurantInfo.cuisine = validation.checkStringArray(
        newRestaurantInfo.cuisine,
        "Restaurant Cuisine",
      );
    }
    if (newRestaurantInfo.rating) {
      newRestaurantInfo.rating = validation.checkStringForNumber(
        newRestaurantInfo.rating,
        "Restaurant Rating",
      );
    }
    if (newRestaurantInfo.price_level) {
      newRestaurantInfo.price_level = validation.checkStringForNumber(
        newRestaurantInfo.price_level,
        "Restaurant Price Level",
      );
    }
    if (newRestaurantInfo.description) {
      newRestaurantInfo.description = validation.checkString(
        newRestaurantInfo.description,
        "Restaurant Description",
      );
    }
    if (newRestaurantInfo.phone) {
      newRestaurantInfo.phone = validation.checkString(
        newRestaurantInfo.phone,
        "Restaurant Phone",
      );
    }
    if (newRestaurantInfo.price) {
      newRestaurantInfo.price = validation.checkString(
        newRestaurantInfo.price,
        "Restaurant Price",
      );
    }
    if (newRestaurantInfo.website) {
      newRestaurantInfo.website = validation.checkURL(
        newRestaurantInfo.website,
        "Restaurant Website",
      );
    }
    const oldRestaurant = await Restaurant.findById(id);
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
      const updateRestaurant = await Restaurant.findByIdAndUpdate(
        id,
        { $set: updateRestaurantBody },
        { new: true },
      );
      if (updateRestaurant) {
        return updateRestaurant;
      } else {
        throw {
          message: `Restaurant with ID: ${id} was not updated`,
          status: 400,
        };
      }
    } else {
      throw {
        message: `No changes were made to the restaurant with ID: ${id}`,
        status: 400,
      };
    }
  }
};

const deleteRestaurantById = async (id) => {
  let parsedId = validation.checkId(id, "RestaurantID");
  const restaurant = await Restaurant.findById(parsedId);
  if (restaurant) {
    const restaurantToDelete = await Restaurant.findByIdAndDelete(parsedId);
    if (restaurantToDelete) {
      return {
        message: `Restaurant with ID: ${id} was deleted`,
        deleted: true,
      };
    } else {
      throw {
        message: `Restaurant with ID: ${id} was not deleted`,
        status: 400,
      };
    }
  } else {
    throw {
      message: `Restaurant not found with ID: ${id}`,
      status: 404,
    };
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
