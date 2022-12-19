const Hotel = require("../model/Hotel");
const data = require("../data/data.js");
const validation = require("../validation/routesValidation");
const newValidation = require("../validation/dataValidation.js");
const Trip = require("../model/Trip");

const getHotelById = async (id) => {
  // let parsedId = validation.toObjectId(id, "HotelId");
  const hotel = await Hotel.find({ location_id: id });
  if (hotel) {
    return hotel;
  } else {
    throw {
      message: `Hotel not found with ID: ${hotel}`,
      status: 404,
    };
  }
};

const getHotelsFromApi = async (req, res, next) => {
  try {
    let page = validation.checkPageNumber(req.params.pg);
    let location = newValidation.checkLocation(req.params.location);
    page = page ? page : "1";
    const hotel = await data.getAllHotels(location, page);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

const getAllHotels = async () => {
  const hotelsList = await Hotel.find();
  if (hotelsList.length > 0) {
    return hotelsList;
  } else {
    throw {
      message: `No hotels found`,
      status: 404,
    };
  }
};

const createHotel = async (hotelBody, id, visitDate) => {
  const convertDate = visitDate.split("-").join("/");
  console.log("currentDateConverted" + convertDate);
  const tripId = id;
  const trip = await Trip.findById(tripId);
  const newHotelInfo = new Hotel(hotelBody);
  newHotelInfo.location_id = validation.checkStringForNumber(
    newHotelInfo.location_id,
    "Hotel Id",
  );
  newHotelInfo.name = validation.checkString(newHotelInfo.name, "Hotel Name");
  newHotelInfo.latitude = validation.checkStringForNumber(
    newHotelInfo.latitude,
    "Hotel Latitude",
  );
  newHotelInfo.longitude = validation.checkStringForNumber(
    newHotelInfo.longitude,
    "Hotel Longitude",
  );

  newHotelInfo.image = validation.checkURL(newHotelInfo.image, "Hotel Image");

  // newHotelInfo.rating = validation.checkStringForNumber(
  //   newHotelInfo.rating,
  //   "Hotel Rating",
  // );

  newHotelInfo.amenities = validation.checkStringArray(
    newHotelInfo.amenities,
    "Hotel Amenities",
  );

  const savedHotel = await newHotelInfo.save();

  trip.hotels.push(savedHotel.location_id);
  console.log(trip);

  const objForPushInItinerary = {
    id: savedHotel.location_id,
    name: savedHotel.name,
    image: savedHotel.image,
  };
  trip.itinerary.forEach((day) => {
    if (day.date == convertDate) {
      day.placesToVisit.push(objForPushInItinerary);
    }
  });

  await trip.save();

  console.log("the trip updated is: " + JSON.stringify(trip));

  if (savedHotel) {
    return savedHotel;
  } else {
    throw {
      message: `Hotel not saved`,
      status: 500,
    };
  }
};

const addHotelToTripItinerary = async (req, res) => {
  const trip = await Trip.findById(req.params.tripid);
  if (!trip) {
    throw {
      message: `Trip not found`,
      status: 404,
    };
  } else {
    const hotel = await Hotel.find({ location_id: req.params.hotelid });
    if (!hotel) {
      throw {
        message: `Hotel not found`,
        status: 404,
      };
    }
    if (!trip.hotels.includes(hotel.location_id)) {
      trip.hotels.push(hotel.location_id);
      await trip.save();
      await trip.update(
        {
          _id: trip._id,
          "itinerary.date": req.params.visitDate,
        },
        { $push: { "itinerary.$.placesToVisit": hotel.location_id } },
        { upsert: true },
      );
      // trip.itinerary.push;
      return trip;
    } else {
      throw {
        message: `Hotel already added to trip`,
        status: 400,
      };
    }
  }
};

const updateHotelById = async (id, updateHotelBody) => {
  let parsedId = validation.toObjectId(id, "HotelId");
  const hotel = await Hotel.findById(parsedId);
  if (!hotel) {
    throw {
      message: `Hotel not found with ID: ${id}`,
      status: 404,
    };
  } else {
    const newHotelInfo = updateHotelBody;
    let updatedHotel = {};
    id = validation.checkId(id, "Hotel Id");
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
    // if (newHotelInfo.rating) {
    //   newHotelInfo.rating = validation.checkStringForNumber(
    //     newHotelInfo.rating,
    //     "Hotel Rating",
    //   );
    // }
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

    const oldHotelInfo = await Hotel.findById(id);
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
      const updatedHotel = await Hotel.findByIdAndUpdate(
        id,
        { $set: updateHotelBody },
        { new: true },
      );
      if (updatedHotel) {
        return updatedHotel;
      } else {
        throw {
          message: `Hotel with ID: ${id} was not updated`,
          status: 400,
        };
      }
    } else {
      throw {
        message: `No changes were made to the Hotel with ID: ${id}`,
        status: 400,
      };
    }
  }
};

const deleteHotelById = async (id) => {
  let parsedId = validation.checkStringForNumber(req.params.id, "HotelID");
  const hotel = await Hotel.findById(parsedId);
  if (hotel) {
    const hotelToDelete = await Hotel.findByIdAndDelete(parsedId);
    if (hotelToDelete) {
      return {
        message: `Hotel with ID: ${id} was deleted`,
        deleted: true,
      };
    } else {
      throw {
        message: `Hotel with ID: ${id} was not deleted`,
        status: 400,
      };
    }
  } else {
    throw {
      message: `Hotel not found with ID: ${id}`,
      status: 404,
    };
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
