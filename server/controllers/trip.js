const Trip = require("../model/Trip");
const User = require("../model/User");
const Hotel = require("../model/Hotel");
const Restaurant = require("../model/Restaurant");
const Attraction = require("../model/Attraction");
const validation = require("../validation/routesValidation");
const nodemailer = require("nodemailer");
const invite = require("./inviteEmail");
const e = require("express");
const data = require("../data/base.js");
const apiImage = require("../data/base.js");

const getTripById = async (id) => {
  let parsedId = validation.toObjectId(id, "TripId");
  const trip = await Trip.findById(parsedId);
  if (trip) {
    return trip;
  } else {
    throw {
      message: `Trip not found with ID: ${id}`,
      status: 404,
    };
  }
};

const getAllTrips = async () => {
  const tripsList = await Trip.find();
  if (tripsList.length > 0) {
    return tripsList;
  } else {
    throw {
      message: `No trips found`,
      status: 404,
    };
  }
};

const createTrip = async (userId, tripBody) => {
  let parsedId = validation.checkString(userId, "UserId");
  let startDate = tripBody.body.tripDate.startDate.split("T")[0];
  let endDate = tripBody.body.tripDate.endDate.split("T")[0];
  let image = await data.getPhotos(tripBody.body.destination);
  let coords = await data.getLocationsCoordinates(tripBody.body.destination);

  const newObj = {
    cur_location: tripBody.body.cur_location,
    destination: tripBody.body.destination,
    tripDate: {
      startDate: startDate,
      endDate: endDate,
    },
    notes: "",
    image: image,
    destCord: coords,
  };
  console.log("newObj");
  console.log(newObj);

  let loop = new Date(startDate);
  endDate = new Date(endDate);
  const newTripInfo = new Trip(newObj);
  const savedTrip = await newTripInfo.save();
  if (!savedTrip) {
    throw {
      message: `Trip was not created`,
      status: 400,
    };
  }

  if (savedTrip) {
    let user = await User.findById(userId);
    if (user) {
      await User.findByIdAndUpdate(parsedId, {
        $push: { trips: savedTrip._id },
      });
    } else {
      throw {
        message: `User not found with ID: ${userId}`,
        status: 404,
      };
    }

    let trip = await Trip.findById(savedTrip._id);
    trip.users.push(user._id);
    while (loop <= endDate) {
      let date = loop.toISOString().split("T")[0].split("-");
      let day = date[2];
      let month = date[1];
      let year = date[0];
      date = `${month}/${day}/${year}`;
      const itineraryObject = {
        date: date,
      };
      trip.itinerary.push(itineraryObject);
      loop.setDate(loop.getDate() + 1);
    }
    await trip.save();
    return trip;
  } else {
    throw {
      message: `Trip was not created`,
      status: 400,
    };
  }
};

const updateTripById = async (id, updateTripBody) => {
  let parsedId = validation.toObjectId(id, "TripId");
  const trip = await Trip.findById(parsedId);

  if (!trip) {
    throw {
      message: `Trip not found with ID: ${id}`,
      status: 404,
    };
  } else {
    const newTripInfo = updateTripBody.body;
    id = validation.checkId(id, "TripId");
    if (newTripInfo.notes) {
      newTripInfo.notes = validation.checkString(newTripInfo.notes, "Notes");
      trip.notes = newTripInfo.notes;
    }
    if (newTripInfo.notes) {
      const updatedTrip = await Trip.findByIdAndUpdate(
        id,
        { $set: trip },
        { new: true },
      );

      if (updatedTrip) {
        return updatedTrip;
      } else {
        throw {
          message: `Trip with ID: ${id} was not updated`,
          status: 400,
        };
      }
    } else {
      throw {
        message: `No changes were made to the Trip with ID: ${id}`,
        status: 400,
      };
    }
  }
};

const deleteTripById = async (id) => {
  let parsedId = validation.toObjectId(id, "TripId");
  const trip = await Trip.findById(parsedId);

  if (trip) {
    const tripToDelete = await Trip.findByIdAndDelete(parsedId);
    if (tripToDelete) {
      return {
        message: `Trip with ID: ${id} was deleted`,
        deleted: true,
      };
    } else {
      throw {
        message: `Trip with ID: ${id} was not deleted`,
        status: 400,
      };
    }
  } else {
    throw {
      message: `Trip not found with ID: ${id}`,
      status: 404,
    };
  }
};

const addAttractionToTrip = async (req, res) => {
  const trip = await Trip.findById(req.params.tripid);
  if (!trip) {
    throw {
      message: `Trip not found`,
      status: 404,
    };
  } else {
    const attraction = await Attraction.findById(req.params.attractionid);
    if (!attraction) {
      throw {
        message: `Attraction not found`,
        status: 404,
      };
    }
    if (!trip.attractions.includes(attraction._id)) {
      trip.attractions.push(attraction._id);
      await trip.save();
      return trip;
    } else {
      throw {
        message: `Attraction already added to trip`,
        status: 400,
      };
    }
  }
};

const removeAttractionFromTrip = async (tripid, attractionid, visitdate) => {
  console.log(tripid, attractionid, visitdate);
  const trip = await Trip.find({ _id: tripid });
  const visitDate = visitdate.split("-").join("/");

  if (trip[0].itinerary.length > 0) {
    trip[0].itinerary.forEach((day) => {
      if (day.date == visitDate) {
        for (let i = 0; i < day.placesToVisit.length; i++) {
          if (day.placesToVisit[i].id == attractionid) {
            console.log("attraction found");
            day.placesToVisit.splice(i, 1);
          }
        }
      }
    });
    if (!trip) {
      throw {
        message: `Trip not found`,
        status: 404,
      };
    } else {
      if (trip[0].attractions.includes(attractionid)) {
        console.log("*****************hwrw************************");
        trip[0].attractions.pull(attractionid.toString());
        await trip[0].save();
        return trip[0];
      } else {
        throw {
          message: `Attraction not found`,
          status: 400,
        };
      }
    }
  }
};

const removeHotelFromTrip = async (req, res) => {
  const trip = await Trip.find({ _id: req.params.tripid });
  const visitDate = req.params.visitDate.split("-").join("/");
  if (trip[0].itinerary.length > 0) {
    trip[0].itinerary.forEach((day) => {
      if (day.date == visitDate) {
        for (let i = 0; i < day.placesToVisit.length; i++) {
          console.log(day.placesToVisit[i]);
          if (day.placesToVisit[i].id == req.params.hotelid) {
            day.placesToVisit.splice(i, 1);
          }
        }
      }
    });
    if (!trip) {
      throw {
        message: `Trip not found`,
        status: 404,
      };
    } else {
      if (trip[0].hotels.includes(req.params.hotelid)) {
        trip[0].hotels.pull(req.params.hotelid.toString());
        console.log("trip is : " + trip[0]);
        await trip[0].save();
        return trip[0];
      } else {
        throw {
          message: `Hotel not in trip`,
          status: 400,
        };
      }
    }
  }
};
const addHotelToTrip = async (req, res) => {
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
      // await trip.update(
      //   {
      //     _id: trip._id,
      //     "itinerary.date": req.params.visitDate,
      //   },
      //   { $push: { "itinerary.$.placesToVisit": hotel.location_id } },
      //   { upsert: true },
      // );
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

const addRestaurantToTrip = async (req, res) => {
  const trip = await Trip.findById(req.params.tripid);
  if (!trip) {
    throw {
      message: `Trip not found`,
      status: 404,
    };
  } else {
    const restaurant = await Restaurant.findById(req.params.restaurantid);
    if (!restaurant) {
      throw {
        message: `Restaurant not found`,
        status: 404,
      };
    }
    if (!trip.restaurants.includes(restaurant._id)) {
      trip.restaurants.push(restaurant._id);
      await trip.save();
      return trip;
    } else {
      throw {
        message: `Restaurant already added to trip`,
        status: 400,
      };
    }
  }
};

const removeRestaurantFromTrip = async (tripid, restaurantid, visitdate) => {
  const trip = await Trip.find({ _id: tripid });
  const visitDate = visitdate.split("-").join("/");

  if (trip[0].itinerary.length > 0) {
    trip[0].itinerary.forEach((day) => {
      if (day.date == visitDate) {
        for (let i = 0; i < day.placesToVisit.length; i++) {
          console.log(day.placesToVisit[i]);
          if (day.placesToVisit[i].id == restaurantid) {
            console.log("restaurant found");
            day.placesToVisit.splice(i, 1);
          }
        }
      }
    });

    if (!trip) {
      throw {
        message: `Trip not found`,
        status: 404,
      };
    } else {
      if (trip[0].restaurants.includes(restaurantid)) {
        trip[0].restaurants.pull(restaurantid.toString());
        await trip[0].save();
        return trip[0];
      } else {
        throw {
          message: `Restaurant not in trip`,
          status: 400,
        };
      }
    }
  }
};

const acceptInviteToTrip = async (req, res) => {
  console.log(req.params.tripId, "==");
  const trip = await Trip.findById(req.params.tripId);
  const checkUserDataInMongo = await User.findById(req.params.userId);
  console.log(checkUserDataInMongo, "inside control");
  if (!trip) {
    throw {
      message: `Trip not found`,
      status: 404,
    };
  } else if (!checkUserDataInMongo) {
    throw {
      message: `User not logged in`,
      status: 400,
    };
  } else {
    if (
      trip.invites.some((invite) => invite.email === checkUserDataInMongo.email)
    ) {
      trip.invites.pull({ email: checkUserDataInMongo.email });
      trip.users.push(checkUserDataInMongo._id);
      console.log(checkUserDataInMongo);
      checkUserDataInMongo.trips.push(trip._id);
      await checkUserDataInMongo.save();
      await trip.save();
      // res.redirect("http://localhost:3000/login");
      return trip;
    } else {
      throw {
        message: `User not invited to trip`,
        status: 400,
      };
    }
  }
};
const inviteUserToTrip = async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  // console.log(trip);
  if (!trip) {
    throw {
      message: `Trip not found`,
      status: 404,
    };
  } else {
    const obj = {
      email: req.body.body.email,
      name: req.body.body.name,
      message: req.body.body.message,
    };
    // console.log(obj, "====");
    if (
      trip.invites.filter((invite) => invite.email === obj.email).length ===
        0 &&
      trip.users.filter((user) => user.email === obj.email).length === 0
    ) {
      trip.invites.push(obj);
      await trip.save();

      const userData = await User.findById(trip.users[0]);
      const signedUpUser = await User.find({ email: req.body.body.email });
      let output = null;
      console.log(signedUpUser, "===signed up user");

      if (signedUpUser.length > 0) {
        console.log("user found");
        output = invite.logInTripEmail(trip, userData, signedUpUser, obj);
      } else if (signedUpUser.length === 0) {
        console.log("user not found");
        output = invite.signUpTripEmail(trip, userData, obj);
      }

      // console.log(output, "==output==");
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "tripplanner057@gmail.com",
          pass: "mdvdrejgamhvndzj",
        },
      });

      let details = {
        from: "tripplanner057@gmail.com",
        to: `${req.body.body.email}`,
        subject: `Invitation to Trip to ${trip.destination} by ${userData.displayName}`,
        html: output,
      };
      // console.log(details, "=details");

      mailTransporter.sendMail(details, function (err, data) {
        if (err) {
          console.log(err);
          console.log("Error Occurs");
        } else {
          // console.log(data, "=data=");
          console.log("Email sent successfully");
        }
      });
      return trip;
    } else {
      // console.log("error");
      throw {
        message: `User with email ${req.body.body.email}, is already invited to trip`,
        status: 400,
      };
    }
  }
};

module.exports = {
  getTripById,
  getAllTrips,
  createTrip,
  updateTripById,
  deleteTripById,
  addRestaurantToTrip,
  removeRestaurantFromTrip,
  addHotelToTrip,
  removeHotelFromTrip,
  addAttractionToTrip,
  removeAttractionFromTrip,
  inviteUserToTrip,
  acceptInviteToTrip,
};
