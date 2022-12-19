const Attraction = require("../model/Attraction");
const data = require("../data/data.js");
const validation = require("../validation/routesValidation");
const newValidation = require("../validation/dataValidation.js");
const Trip = require("../model/Trip");
const getAttractionById = async (id) => {
  // let parsedId = validation.toObjectId(req.params.id, "AttractionId");
  const attraction = await Attraction.findById(id);
  if (attraction) {
    return attraction;
  } else {
    throw {
      message: `Attraction not found with ID: ${id}`,
      status: 404,
    };
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

const getAllAttractions = async () => {
  const attractionsList = await Attraction.find();
  if (attractionsList.length > 0) {
    return attractionsList;
  } else {
    throw {
      message: `No attractions found`,
      status: 404,
    };
  }
};

const createAttraction = async (attractionBody, id, visitDate) => {
  const convertDate = visitDate.split("-").join("/");
  const tripId = id;
  const trip = await Trip.findById(tripId);
  console.log("dsfdsf" + trip);
  const newAttractionInfo = new Attraction(attractionBody);

  newAttractionInfo.location_id = validation.checkStringForNumber(
    newAttractionInfo.location_id,
    "Location Id",
  );

  newAttractionInfo.name = validation.checkString(
    newAttractionInfo.name,
    "Attraction Name",
  );

  newAttractionInfo.latitude = validation.checkStringForNumber(
    newAttractionInfo.latitude,
    "Latitude",
  );
  newAttractionInfo.longitude = validation.checkStringForNumber(
    newAttractionInfo.longitude,
    "Longitude",
  );
  newAttractionInfo.description = validation.checkString(
    newAttractionInfo.description,
    "Description",
  );

  newAttractionInfo.image = validation.checkURL(
    newAttractionInfo.image,
    "Image",
  );
  newAttractionInfo.category = validation.checkString(
    newAttractionInfo.category,
    "Category",
  );
  newAttractionInfo.rating = validation.checkStringForNumber(
    newAttractionInfo.rating,
    "Rating",
  );

  newAttractionInfo.website = validation.checkURL(
    newAttractionInfo.website,
    "Website",
  );
  newAttractionInfo.phone = validation.checkPhoneNumber(
    newAttractionInfo.phone,
    "Phone",
  );
  newAttractionInfo.address = validation.checkString(
    newAttractionInfo.address,
    "Address",
  );
  newAttractionInfo.web_url = validation.checkURL(
    newAttractionInfo.web_url,
    "Web Url",
  );
  newAttractionInfo.num_reviews = validation.checkStringForNumber(
    newAttractionInfo.num_reviews,
    "Number of Reviews",
  );
  const attraction = await newAttractionInfo.save();
  //console.log("attraction is " + attraction);
  //console.log("trip is " + trip);
  const objForPushInItinerary = {
    id: attraction._id,
    name: attraction.name,
    image: attraction.image,
  };
  trip.itinerary.forEach((day) => {
    if (day.date === convertDate) {
      day.placesToVisit.push(objForPushInItinerary);
      trip.attractions.push(attraction._id);
    }
  });

  await trip.save();

  if (attraction) {
    return attraction;
  } else {
    throw {
      message: `Attraction not created`,
      status: 404,
    };
  }
};

const updateAttractionById = async (id, updateAttractionBody) => {
  let parsedId = validation.toObjectId(id, "AttractionId");
  const attraction = await Attraction.findById(parsedId);
  if (attraction) {
    throw {
      message: `Attraction not found with ID: ${id}`,
      status: 404,
    };
  } else {
    const newAttractionInfo = updateAttractionBody;
    let updatedAttraction = {};

    id = validation.checkId(id, "Attraction Id");
    if (newAttractionInfo.location_id) {
      newAttractionInfo.location_id = validation.checkStringForNumber(
        newAttractionInfo.location_id,
        "Location Id",
      );
    }
    if (newAttractionInfo.name) {
      newAttractionInfo.name = validation.checkString(
        newAttractionInfo.name,
        "Attraction Name",
      );
    }
    if (newAttractionInfo.latitude) {
      newAttractionInfo.latitude = validation.checkStringForNumber(
        newAttractionInfo.latitude,
        "Latitude",
      );
    }
    if (newAttractionInfo.longitude) {
      newAttractionInfo.longitude = validation.checkStringForNumber(
        newAttractionInfo.longitude,
        "Longitude",
      );
    }
    if (newAttractionInfo.description) {
      newAttractionInfo.description = validation.checkString(
        newAttractionInfo.description,
        "Description",
      );
    }
    if (newAttractionInfo.image) {
      newAttractionInfo.image = validation.checkURL(
        newAttractionInfo.image,
        "Image",
      );
    }
    if (newAttractionInfo.category) {
      newAttractionInfo.category = validation.checkString(
        newAttractionInfo.category,
        "Category",
      );
    }
    if (newAttractionInfo.rating) {
      newAttractionInfo.rating = validation.checkStringForNumber(
        newAttractionInfo.rating,
        "Rating",
      );
    }
    if (newAttractionInfo.price) {
      newAttractionInfo.price = validation.checkStringForNumber(
        newAttractionInfo.price,
        "Price",
      );
    }
    if (newAttractionInfo.website) {
      newAttractionInfo.website = validation.checkURL(
        newAttractionInfo.website,
        "Website",
      );
    }
    if (newAttractionInfo.phone) {
      newAttractionInfo.phone = validation.checkPhoneNumber(
        newAttractionInfo.phone,
        "Phone",
      );
    }
    if (newAttractionInfo.address) {
      newAttractionInfo.address = validation.checkString(
        newAttractionInfo.address,
        "Address",
      );
    }
    if (newAttractionInfo.web_url) {
      newAttractionInfo.web_url = validation.checkURL(
        newAttractionInfo.web_url,
        "Web Url",
      );
    }
    if (newAttractionInfo.num_reviews) {
      newAttractionInfo.num_reviews = validation.checkStringForNumber(
        newAttractionInfo.num_reviews,
        "Number of Reviews",
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
        id,
        { $set: updatedAttraction },
        { new: true },
      );
      if (updatedAttraction) {
        res.status(200).json(updatedAttraction);
      } else {
        throw {
          message: "The attraction with the specified ID does not exist.",
          status: 400,
        };
      }
    } else {
      throw {
        message: `No changes were made to the attraction with ID: ${id}`,
        status: 400,
      };
    }
  }
};

const deleteAttractionById = async (id) => {
  let parsedId = validation.toObjectId(id, "Attraction ID");
  const attraction = await Attraction.findById(parsedId);
  if (attraction) {
    const attractionToDelete = await Attraction.findByIdAndDelete(parsedId);
    if (attractionToDelete) {
      return {
        message: `Attraction on ID (${req.params.id}) has been deleted...`,
        deleted: true,
      };
    } else {
      throw {
        message: `Attraction with ID: ${id} was not deleted`,
        status: 400,
      };
    }
  } else {
    throw {
      message: `Attraction not found with ID: ${id}`,
      status: 404,
    };
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
