const Hotel = require("../model/Hotel");
const data = require("../data/data.js");
const validation = require("../validation/routesValidation");

const getHotelById = async (req, res, next) => {
  try {
    validation.checkId(req.params.id, "Hotel Id");
    const hotel = await Hotel.findById(req.params.id);
    if (hotel) {
      res.status(200).json(hotel);
    } else {
      throw {
        message: `Hotel not found with ID: ${hotel}`,
        status: 404,
      };
    }
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

const getHotelsFromApi = async (req, res, next) => {
  let page = req.params.pg;
  let latitude = req.params.latitude;
  let longitude = req.params.longitude;

  try {
    const hotel = data.getAllHotels(latitude, longitude, page);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    if (hotels.length > 0) {
      res.status(200).json(hotels);
    } else {
      throw {
        message: `No hotels found`,
        status: 404,
      };
    }
  } catch (err) {
    next(err);
  }
};

const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    newHotel.location_id = validation.checkStringForNumber(
      newHotel.location_id,
      "Hotel Id",
    );
    newHotel.name = validation.checkString(newHotel.name, "Hotel Name");
    newHotel.latitude = validation.checkStringForNumber(
      newHotel.latitude,
      "Hotel Latitude",
    );
    newHotel.longitude = validation.checkStringForNumber(
      newHotel.longitude,
      "Hotel Longitude",
    );
    newHotel.num_reviews = validation.checkStringForNumber(
      newHotel.num_reviews,
      "Hotel Number of Reviews",
    );
    newHotel.category = validation.checkString(
      newHotel.category,
      "Hotel Category",
    );
    newHotel.image = validation.checkURL(newHotel.image, "Hotel Image");
    newHotel.address = validation.checkString(
      newHotel.address,
      "Hotel Address",
    );
    newHotel.web_url = validation.checkURL(newHotel.web_url, "Hotel Web URL");
    newHotel.rating = validation.checkStringForNumber(
      newHotel.rating,
      "Hotel Rating",
    );
    newHotel.price_level = validation.checkPriceLevel(
      newHotel.price_level,
      "Hotel Price Level",
    );
    newHotel.amenities = validation.checkStringArray(
      newHotel.amenities,
      "Hotel Amenities",
    );

    newHotel.phone = validation.checkPhoneNumber(newHotel.phone, "Hotel Phone");
    newHotel.price = validation.checkPriceRange(newHotel.price, "Hotel Price");

    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

const updateHotelById = async (req, res, next) => {
  const newHotelInfo = req.body;
  let updatedHotel = {};
  try {
    validation.checkId(req.params.id, "Hotel Id");
    if (newHotelInfo.location_id) {
      newHotelInfo.location_id = validation.checkStringForNumber(
        newHotelInfo.location_id,
        "Hotel Id",
      );
    }
    if (newHotelInfo.name) {
      newHotelInfo.name = validation.checkString(
        newHotelInfo.name,
        "Hotel Name",
      );
    }
    if (newHotelInfo.latitude) {
      newHotelInfo.latitude = validation.checkStringForNumber(
        newHotelInfo.latitude,

        "Hotel Latitude",
      );
    }
    if (newHotelInfo.longitude) {
      newHotelInfo.longitude = validation.checkStringForNumber(
        newHotelInfo.longitude,
        "Hotel Longitude",
      );
    }
    if (newHotelInfo.num_reviews) {
      newHotelInfo.num_reviews = validation.checkStringForNumber(
        newHotelInfo.num_reviews,
        "Hotel Number of Reviews",
      );
    }
    if (newHotelInfo.category) {
      newHotelInfo.category = validation.checkString(
        newHotelInfo.category,
        "Hotel Category",
      );
    }
    if (newHotelInfo.image) {
      newHotelInfo.image = validation.checkURL(
        newHotelInfo.image,
        "Hotel Image",
      );
    }
    if (newHotelInfo.address) {
      newHotelInfo.address = validation.checkString(
        newHotelInfo.address,
        "Hotel Address",
      );
    }
    if (newHotelInfo.web_url) {
      newHotelInfo.web_url = validation.checkURL(
        newHotelInfo.web_url,
        "Hotel Web URL",
      );
    }
    if (newHotelInfo.rating) {
      newHotelInfo.rating = validation.checkStringForNumber(
        newHotelInfo.rating,
        "Hotel Rating",
      );
    }
    if (newHotelInfo.price_level) {
      newHotelInfo.price_level = validation.checkPriceLevel(
        newHotelInfo.price_level,
        "Hotel Price Level",
      );
    }
    if (newHotelInfo.phone) {
      newHotelInfo.phone = validation.checkPhoneNumber(
        newHotelInfo.phone,
        "Hotel Phone",
      );
    }
    if (newHotelInfo.price) {
      newHotelInfo.price = validation.checkPriceRange(
        newHotelInfo.price,
        "Hotel Price",
      );
    }
    if (newHotelInfo.amenities) {
      newHotelInfo.amenities = validation.checkStringArray(
        newHotelInfo.amenities,
        "Hotel Amenities",
      );
    }

    const oldHotelInfo = await Hotel.findById(req.params.id);
    if (
      newHotelInfo.location_id &&
      newHotelInfo.location_id !== oldHotelInfo.location_id
    ) {
      updatedHotel.location_id = newHotelInfo.location_id;
    }
    if (newHotelInfo.name && newHotelInfo.name !== oldHotelInfo.name) {
      updatedHotel.name = newHotelInfo.name;
    }
    if (
      newHotelInfo.latitude &&
      newHotelInfo.latitude !== oldHotelInfo.latitude
    ) {
      updatedHotel.latitude = newHotelInfo.latitude;
    }
    if (
      newHotelInfo.longitude &&
      newHotelInfo.longitude !== oldHotelInfo.longitude
    ) {
      updatedHotel.longitude = newHotelInfo.longitude;
    }
    if (
      newHotelInfo.num_reviews &&
      newHotelInfo.num_reviews !== oldHotelInfo.num_reviews
    ) {
      updatedHotel.num_reviews = newHotelInfo.num_reviews;
    }
    if (
      newHotelInfo.category &&
      newHotelInfo.category !== oldHotelInfo.category
    ) {
      updatedHotel.category = newHotelInfo.category;
    }
    if (newHotelInfo.image && newHotelInfo.image !== oldHotelInfo.image) {
      updatedHotel.image = newHotelInfo.image;
    }
    if (newHotelInfo.address && newHotelInfo.address !== oldHotelInfo.address) {
      updatedHotel.address = newHotelInfo.address;
    }
    if (newHotelInfo.web_url && newHotelInfo.web_url !== oldHotelInfo.web_url) {
      updatedHotel.web_url = newHotelInfo.web_url;
    }
    if (newHotelInfo.rating && newHotelInfo.rating !== oldHotelInfo.rating) {
      updatedHotel.rating = newHotelInfo.rating;
    }
    if (
      newHotelInfo.price_level &&
      newHotelInfo.price_level !== oldHotelInfo.price_level
    ) {
      updatedHotel.price_level = newHotelInfo.price_level;
    }
    if (newHotelInfo.phone && newHotelInfo.phone !== oldHotelInfo.phone) {
      updatedHotel.phone = newHotelInfo.phone;
    }
    if (newHotelInfo.price && newHotelInfo.price !== oldHotelInfo.price) {
      updatedHotel.price = newHotelInfo.price;
    }
    if (
      newHotelInfo.amenities &&
      JSON.stringify(newHotelInfo.amenities) !==
        JSON.stringify(oldHotelInfo.amenities)
    ) {
      updatedHotel.amenities = newHotelInfo.amenities;
    }

    if (Object.keys(updatedHotel).length != 0) {
      updatedHotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        updatedHotel,
        { new: true },
      );
      if (updatedHotel) {
        res.status(200).json(updatedHotel);
      } else {
        res.status(404).json({ message: "Hotel not found" });
      }
    } else {
      res.status(400).json({ message: "No valid fields to update" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteHotelById = async (req, res, next) => {
  try {
    id = validation.checkId(req.params.id, "Hotel ID");
    const Hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (Hotel) {
      res
        .status(200)
        .json(`Hotel on ID (${req.params.id}) has been deleted...`);
    } else {
      res.status(404).json({ message: "Hotel not found" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getHotelById,
  getAllHotels,
  createHotel,
  updateHotelById,
  deleteHotelById,
  getHotelsFromApi,
};
