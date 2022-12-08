const { parse } = require("dotenv");
const Place = require("../model/Place");
const validation = require("../validation/routesValidation");

const getPlaceById = async (id) => {
  let parsedId = validation.toObjectId(id, "PlaceId");
  const place = await Place.findById(parsedId);
  if (place) {
    return place;
  } else {
    throw {
      message: `Place not found with ID: ${place}`,
      status: 404,
    };
  }
};

const getAllPlaces = async () => {
  const placesList = await Place.find();
  if (placesList.length > 0) {
    res.status(200).json(placesList);
  } else {
    throw {
      message: `No places found`,
      status: 404,
    };
  }
};

const createPlace = async (placeBody) => {
  const newPlaceInfo = new Place(placeBody);

  newPlaceInfo.name = validation.checkString(newPlaceInfo.name, "Place Name");
  newPlaceInfo.latitude = validation.checkStringForNumber(
    newPlaceInfo.latitude,
    "Place Latitude",
  );
  newPlaceInfo.longitude = validation.checkStringForNumber(
    newPlaceInfo.longitude,
    "Place Longitude",
  );

  newPlaceInfo.address = validation.checkString(
    newPlaceInfo.address,
    "Place Address",
  );

  newPlaceInfo.image = validation.checkURL(
    newPlaceInfo.image,
    "Place Image Url",
  );

  newPlaceInfo.description = validation.checkString(
    newPlaceInfo.description,
    "Place Description",
  );

  newPlaceInfo.rating = validation.checkStringForNumber(
    newPlaceInfo.rating,
    "Place Rating",
  );

  newPlaceInfo.website = validation.checkURL(
    newPlaceInfo.website,
    "Place Website",
  );

  const savedPlace = await newPlaceInfo.save();
  if (savedPlace) {
    return savedPlace;
  } else {
    throw {
      message: `Place not created`,
      status: 400,
    };
  }
};

const updatePlacebyId = async (id, updatePlaceBody) => {
  let parsedId = validation.toObjectId(id, "PlaceId");
  const place = await Place.findById(parsedId);
  if (!place) {
    throw {
      message: `Place not found with ID: ${id}`,
      status: 404,
    };
  } else {
    const newPlaceInfo = updatePlaceBody;
    let updatedPlace = {};

    id = validation.checkId(id, "Place Id");
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
    const oldPlaceInfo = await Place.findById(id);
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
        id,
        { $set: updatePlaceBody },
        { new: true },
      );

      if (updatedPlace) {
        return updatedPlace;
      } else {
        throw {
          message: `Place with ID: ${id} was not updated`,
          status: 400,
        };
      }
    } else {
      throw {
        message: `No changes were made to the place with ID: ${id}`,
        status: 400,
      };
    }
  }
};

const deletePlaceById = async (id) => {
  let parsedId = validation.toObjectId(id, "PlaceId");
  const place = await Place.findById(parsedId);
  if (place) {
    const placeToDelete = await Place.findByIdAndDelete(parsedId);
    if (placeToDelete) {
      return {
        message: `Place with ID: ${id} was deleted`,
        deleted: true,
      };
    } else {
      throw {
        message: `Place with ID: ${id} was not deleted`,
        status: 400,
      };
    }
  } else {
    throw {
      message: `Place not found with ID: ${id}`,
      status: 404,
    };
  }

  // const place = await Place.findByIdAndDelete(req.params.id);
  if (place) {
    res.status(200).json(`Place on ID (${req.params.id}) has been deleted...`);
  } else {
    throw {
      message: `Place not found with ID: ${req.params.id}`,
      status: 404,
    };
  }
};

module.exports = {
  getPlaceById,
  getAllPlaces,
  createPlace,
  updatePlacebyId,
  deletePlaceById,
};
