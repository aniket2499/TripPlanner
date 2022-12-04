const Attraction = require("../model/Attraction");
const data = require("../data/data.js");
const validation = require("../validation/routesValidation");
const newValidation = require("../validation/dataValidation.js");

const getAttractionById = async (req, res, next) => {
  try {
    id = validation.checkId(req.params.id, "Attraction Id");
    const attraction = await Attraction.findById(req.params.id);
    if (attraction) {
      res.status(200).json(attraction);
    } else {
      throw {
        message: `Attraction not found with ID: ${attraction}`,
        status: 404,
      };
    }
    res.status(200).json(attraction);
  } catch (err) {
    next(err);
  }
};

const getAttractionsFromApi = async (req, res, next) => {
  try {
    let page = validation.checkPageNumber(req.params.pg);
    let location = newValidation.checkLocation(req.params.location);
    let rating = validation.checkReview(req.params.rating);
    page = page ? page : "1";
    rating = req.params.rating ? req.params.rating : "3.0";
    const attractions = await data.getAllAttractions(location, page, rating);
    if (attractions) {
      res.status(200).json(attractions);
    } else {
      throw {
        message: `Attractions not found with Location ${location} and Page Number: ${page}`,
        status: 404,
      };
    }
  } catch (err) {
    next(err);
  }
};

const getAllAttractions = async (req, res, next) => {
  try {
    const attractions = await Attraction.find();
    if (attractions.length > 0) {
      res.status(200).json(attractions);
    } else {
      throw {
        message: `No attractions found`,
        status: 404,
      };
    }
  } catch (err) {
    next(err);
  }
};

const createAttraction = async (req, res, next) => {
  const newAttraction = new Attraction(req.body);

  try {
    newAttraction.location_id = validation.checkStringForNumber(
      newAttraction.location_id,
      "Location Id"
    );

    newAttraction.name = validation.checkString(
      newAttraction.name,
      "Attraction Name"
    );

    newAttraction.latitude = validation.checkStringForNumber(
      newAttraction.latitude,
      "Latitude"
    );
    newAttraction.longitude = validation.checkStringForNumber(
      newAttraction.longitude,
      "Longitude"
    );
    newAttraction.description = validation.checkString(
      newAttraction.description,
      "Description"
    );

    newAttraction.image = validation.checkURL(newAttraction.image, "Image");
    newAttraction.category = validation.checkString(
      newAttraction.category,
      "Category"
    );
    newAttraction.rating = validation.checkStringForNumber(
      newAttraction.rating,
      "Rating"
    );

    newAttraction.website = validation.checkURL(
      newAttraction.website,
      "Website"
    );
    newAttraction.phone = validation.checkPhoneNumber(
      newAttraction.phone,
      "Phone"
    );
    newAttraction.address = validation.checkString(
      newAttraction.address,
      "Address"
    );
    newAttraction.web_url = validation.checkURL(
      newAttraction.web_url,
      "Web Url"
    );
    newAttraction.num_reviews = validation.checkStringForNumber(
      newAttraction.num_reviews,
      "Number of Reviews"
    );
    const attraction = await newAttraction.save();
    res.status(201).json(attraction);
  } catch (err) {
    next(err);
  }
};

const updateAttractionById = async (req, res, next) => {
  const newAttractionInfo = req.body;
  let updatedAttraction = {};

  try {
    id = validation.checkId(req.params.id, "Attraction Id");
    if (newAttractionInfo.location_id) {
      newAttractionInfo.location_id = validation.checkStringForNumber(
        newAttractionInfo.location_id,
        "Location Id"
      );
    }
    if (newAttractionInfo.name) {
      newAttractionInfo.name = validation.checkString(
        newAttractionInfo.name,
        "Attraction Name"
      );
    }
    if (newAttractionInfo.latitude) {
      newAttractionInfo.latitude = validation.checkStringForNumber(
        newAttractionInfo.latitude,
        "Latitude"
      );
    }
    if (newAttractionInfo.longitude) {
      newAttractionInfo.longitude = validation.checkStringForNumber(
        newAttractionInfo.longitude,
        "Longitude"
      );
    }
    if (newAttractionInfo.description) {
      newAttractionInfo.description = validation.checkString(
        newAttractionInfo.description,
        "Description"
      );
    }
    if (newAttractionInfo.image) {
      newAttractionInfo.image = validation.checkURL(
        newAttractionInfo.image,
        "Image"
      );
    }
    if (newAttractionInfo.category) {
      newAttractionInfo.category = validation.checkString(
        newAttractionInfo.category,
        "Category"
      );
    }
    if (newAttractionInfo.rating) {
      newAttractionInfo.rating = validation.checkStringForNumber(
        newAttractionInfo.rating,
        "Rating"
      );
    }
    if (newAttractionInfo.price) {
      newAttractionInfo.price = validation.checkStringForNumber(
        newAttractionInfo.price,
        "Price"
      );
    }
    if (newAttractionInfo.website) {
      newAttractionInfo.website = validation.checkURL(
        newAttractionInfo.website,
        "Website"
      );
    }
    if (newAttractionInfo.phone) {
      newAttractionInfo.phone = validation.checkPhoneNumber(
        newAttractionInfo.phone,
        "Phone"
      );
    }
    if (newAttractionInfo.address) {
      newAttractionInfo.address = validation.checkString(
        newAttractionInfo.address,
        "Address"
      );
    }
    if (newAttractionInfo.web_url) {
      newAttractionInfo.web_url = validation.checkURL(
        newAttractionInfo.web_url,
        "Web Url"
      );
    }
    if (newAttractionInfo.num_reviews) {
      newAttractionInfo.num_reviews = validation.checkStringForNumber(
        newAttractionInfo.num_reviews,
        "Number of Reviews"
      );
    }
    const oldAttractionInfo = await Attraction.findById(id);

    if (
      newAttractionInfo.location_id &&
      newAttractionInfo.location_id !== newAttractionInfo.location_id
    ) {
      newAttractionInfo.location_id = newAttractionInfo.location_id;
    }
    if (
      newAttractionInfo.name &&
      newAttractionInfo.name !== oldAttractionInfo.name
    ) {
      updatedAttraction.name = newAttractionInfo.name;
    }
    if (
      newAttractionInfo.latitude &&
      newAttractionInfo.latitude !== oldAttractionInfo.latitude
    ) {
      updatedAttraction.latitude = newAttractionInfo.latitude;
    }
    if (
      newAttractionInfo.longitude &&
      newAttractionInfo.longitude !== oldAttractionInfo.longitude
    ) {
      updatedAttraction.longitude = newAttractionInfo.longitude;
    }
    if (
      newAttractionInfo.description &&
      newAttractionInfo.description !== oldAttractionInfo.description
    ) {
      updatedAttraction.description = newAttractionInfo.description;
    }
    if (
      newAttractionInfo.image &&
      newAttractionInfo.image !== oldAttractionInfo.image
    ) {
      updatedAttraction.image = newAttractionInfo.image;
    }
    if (
      newAttractionInfo.category &&
      newAttractionInfo.category !== oldAttractionInfo.category
    ) {
      updatedAttraction.category = newAttractionInfo.category;
    }
    if (
      newAttractionInfo.rating &&
      newAttractionInfo.rating !== oldAttractionInfo.rating
    ) {
      updatedAttraction.rating = newAttractionInfo.rating;
    }
    if (
      newAttractionInfo.price &&
      newAttractionInfo.price !== oldAttractionInfo.price
    ) {
      updatedAttraction.price = newAttractionInfo.price;
    }

    if (
      newAttractionInfo.website &&
      newAttractionInfo.website !== oldAttractionInfo.website
    ) {
      updatedAttraction.website = newAttractionInfo.website;
    }
    if (
      newAttractionInfo.phone &&
      newAttractionInfo.phone !== oldAttractionInfo.phone
    ) {
      updatedAttraction.phone = newAttractionInfo.phone;
    }

    if (
      newAttractionInfo.address &&
      newAttractionInfo.address !== oldAttractionInfo.address
    ) {
      updatedAttraction.address = newAttractionInfo.address;
    }
    if (
      newAttractionInfo.web_url &&
      newAttractionInfo.web_url !== oldAttractionInfo.web_url
    ) {
      updatedAttraction.web_url = newAttractionInfo.web_url;
    }
    if (
      newAttractionInfo.num_reviews &&
      newAttractionInfo.num_reviews !== oldAttractionInfo.num_reviews
    ) {
      updatedAttraction.num_reviews = newAttractionInfo.num_reviews;
    }

    if (Object.keys(updatedAttraction).length != 0) {
      const updatedAttraction = await Attraction.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (updatedAttraction) {
        res.status(200).json(updatedAttraction);
      } else {
        res.status(404).json({
          message: "The attraction with the specified ID does not exist.",
        });
      }
    } else {
      res.status(400).json({ message: "No changes detected" });
    }
  } catch (err) {
    next(err);
  }
};

const deleteAttractionById = async (req, res, next) => {
  try {
    id = validation.checkId(req.params.id, "Attraction Id");
    const attraction = await Attraction.findByIdAndDelete(req.params.id);
    if (attraction) {
      res
        .status(200)
        .json(`Attraction on ID (${req.params.id}) has been deleted...`);
    } else {
      throw {
        message: `Attraction not found with ID: ${attraction}`,
        status: 404,
      };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAttractionById,
  getAllAttractions,
  createAttraction,
  updateAttractionById,
  deleteAttractionById,
  getAttractionsFromApi,
};
