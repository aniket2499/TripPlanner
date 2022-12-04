const Place = require("../model/Place");
const validation = require("../validation/routesValidation");
const getPlaceById = async (req, res, next) => {
  try {
    validation.checkId(req.params.id, "Place Id");
    const place = await Place.findById(req.params.id);
    if (place) {
      res.status(200).json(place);
    } else {
      throw {
        message: `Place not found with ID: ${place}`,
        status: 404,
      };
    }
  } catch (err) {
    next(err);
  }
};

const getAllPlaces = async (req, res, next) => {
  try {
    const places = await Place.find();
    if (places.length > 0) {
      res.status(200).json(places);
    } else {
      throw {
        message: `No places found`,
        status: 404,
      };
    }
  } catch (err) {
    next(err);
  }
};

const createPlace = async (req, res, next) => {
  const newPlace = new Place(req.body);
  try {
    newPlace.name = validation.checkString(newPlace.name, "Place Name");
    newPlace.latitude = validation.checkStringForNumber(
      newPlace.latitude,
      "Place Latitude",
    );
    newPlace.longitude = validation.checkStringForNumber(
      newPlace.longitude,
      "Place Longitude",
    );

    newPlace.address = validation.checkString(
      newPlace.address,
      "Place Address",
    );

    newPlace.image = validation.checkURL(newPlace.image, "Place Image Url");

    newPlace.description = validation.checkString(
      newPlace.description,
      "Place Description",
    );

    newPlace.rating = validation.checkStringForNumber(
      newPlace.rating,
      "Place Rating",
    );

    newPlace.website = validation.checkURL(newPlace.website, "Place Website");

    const savedPlace = await newPlace.save();
    res.status(201).json(savedPlace);
  } catch (error) {
    next(error);
  }
};

const updatePlacebyId = async (req, res, next) => {
  const newPlaceInfo = req.body;
  let updatedPlace = {};
  try {
    validation.checkId(req.params.id, "Place Id");
    if (newPlaceInfo.name) {
      newPlaceInfo.name = validation.checkString(
        newPlaceInfo.name,
        "Place Name",
      );
    }
    if (newPlaceInfo.category) {
      newPlaceInfo.category = validation.checkString(
        newPlaceInfo.category,
        "Place Category",
      );
    }
    if (newPlaceInfo.latitude) {
      newPlaceInfo.latitude = validation.checkStringForNumber(
        newPlaceInfo.latitude,
        "Place Latitude",
      );
    }
    if (newPlaceInfo.longitude) {
      newPlaceInfo.longitude = validation.checkStringForNumber(
        newPlaceInfo.longitude,
        "Place Longitude",
      );
    }
    if (newPlaceInfo.address) {
      newPlaceInfo.address = validation.checkString(
        newPlaceInfo.address,
        "Place Address",
      );
    }
    if (newPlaceInfo.image) {
      newPlaceInfo.image = validation.checkString(
        newPlaceInfo.image,
        "Place Image",
      );
    }
    if (newPlaceInfo.description) {
      newPlaceInfo.description = validation.checkString(
        newPlaceInfo.description,
        "Place Description",
      );
    }
    if (newPlaceInfo.rating) {
      newPlaceInfo.rating = validation.checkStringForNumber(
        newPlaceInfo.rating,
        "Place Rating",
      );
    }
    if (newPlaceInfo.website) {
      newPlaceInfo.website = validation.checkURL(
        newPlaceInfo.website,
        "Place Website",
      );
    }
    const oldPlaceInfo = await Place.findById(req.params.id);
    if (newPlaceInfo.name && newPlaceInfo.name !== oldPlaceInfo.name) {
      updatedPlace.name = newPlaceInfo.name;
    }
    if (
      newPlaceInfo.category &&
      newPlaceInfo.category !== oldPlaceInfo.category
    ) {
      updatedPlace.category = newPlaceInfo.category;
    }
    if (
      newPlaceInfo.latitude &&
      newPlaceInfo.latitude !== oldPlaceInfo.latitude
    ) {
      updatedPlace.latitude = newPlaceInfo.latitude;
    }
    if (
      newPlaceInfo.longitude &&
      newPlaceInfo.longitude !== oldPlaceInfo.longitude
    ) {
      updatedPlace.longitude = newPlaceInfo.longitude;
    }
    if (newPlaceInfo.address && newPlaceInfo.address !== oldPlaceInfo.address) {
      updatedPlace.address = newPlaceInfo.address;
    }
    if (newPlaceInfo.image && newPlaceInfo.image !== oldPlaceInfo.image) {
      updatedPlace.image = newPlaceInfo.image;
    }
    if (
      newPlaceInfo.description &&
      newPlaceInfo.description !== oldPlaceInfo.description
    ) {
      updatedPlace.description = newPlaceInfo.description;
    }
    if (newPlaceInfo.rating && newPlaceInfo.rating !== oldPlaceInfo.rating) {
      updatedPlace.rating = newPlaceInfo.rating;
    }
    if (newPlaceInfo.website && newPlaceInfo.website !== oldPlaceInfo.website) {
      updatedPlace.website = newPlaceInfo.website;
    }
    if (Object.keys(updatedPlace).length != 0) {
      const updatedPlace = await Place.findByIdAndUpdate(
        req.params.id,
        updatedPlace,
        { new: true },
      );

      if (updatedPlace) {
        res.status(200).json(updatedPlace);
      } else {
        throw {
          message: `Place not found with ID: ${req.params.id}`,
          status: 404,
        };
      }
    } else {
      throw {
        message: `No fields to update`,
        status: 400,
      };
    }
  } catch (err) {
    next(err);
  }
};

const deletePlaceById = async (req, res, next) => {
  try {
    validation.checkId(req.params.id, "Place Id");
    const place = await Place.findByIdAndDelete(req.params.id);
    if (place) {
      res
        .status(200)
        .json(`Place on ID (${req.params.id}) has been deleted...`);
    } else {
      throw {
        message: `Place not found with ID: ${req.params.id}`,
        status: 404,
      };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPlaceById,
  getAllPlaces,
  createPlace,
  updatePlacebyId,
  deletePlaceById,
};
