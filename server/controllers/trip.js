const Trip = require("../model/Trip");
const User = require("../controllers/user");
const validation = require("../validation/routesValidation");
const { ObjectId } = require("mongodb");

const getTripById = async (req, res, next) => {
  try {
    validation.checkId(req.params.id);
    const trip = await Trip.findById(req.params.id);
    if (trip) {
      res.status(200).json(trip);
    } else {
      throw {
        message: `Trip not found with ID: ${trip}`,
        status: 404,
      };
    }
    res.status(200).json(trip);
  } catch (err) {
    next(err);
  }
};

const getAllTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find();
    if (trips.length > 0) {
      res.status(200).json(trips);
    } else {
      throw {
        message: `No trips found`,
        status: 404,
      };
    }
  } catch (err) {
    next(err);
  }
};

const createTrip = async (req, res, next) => {
  const newTrip = new Trip(req.body);
  const userId = "638be5e7832fc1847ee215f5";

  try {
    const savedTrip = await newTrip.save();
    const user = await User.getUserById({ params: { id: userId } }, res, next);
    user.trips.push(savedTrip._id);
    await User.updateUserById(
      { params: { id: userId }, body: user },
      res,
      next,
    );
    // res.status(201).json(savedTrip);
  } catch (err) {
    next(err);
  }
};

const updateTripById = async (req, res, next) => {
  try {
    const updateTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updateTrip);
  } catch (err) {
    next(err);
  }
};

const deleteTripById = async (req, res, next) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.status(200).json(`Trip on ID (${req.params.id}) has been deleted...`);
  } catch (err) {
    next(err);
  }
};

const inviteUserToTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip.invites.includes(req.body.email)) {
      trip.invites.push(req.body.email);
      await Trip.updateTripById(
        { params: { id: req.params.id }, body: trip },
        res,
        next,
      );
      res.status(200).json(trip);
    } else {
      throw {
        message: `User already invited to trip`,
        status: 400,
      };
    }
  } catch (err) {
    next(err);
  }
};

// user accepts invite to trip and is added to trip

const acceptInviteToTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    //checking if user is currently logged in or not
    const user = await User.getUserById(
      { params: { id: req.body.id } },
      res,
      next,
    );

    if (user) {
      if (trip.invites.includes(user.email)) {
        trip.invites.pull(user.email);
        trip.users.push(user._id);

        await Trip.updateTripById(
          { params: { id: req.params.id }, body: trip },
          res,
          next,
        );
        res.status(200).json(trip);
      } else {
        throw {
          message: `User not invited to trip`,
          status: 400,
        };
      }
    } else {
      throw {
        message: `User not logged in`,
        status: 400,
      };
    }
  } catch (err) {
    next(err);
  }
};

const addRestaurantToTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    const restaurant = await Restaurant.getRestaurantById(
      { params: { id: req.body.id } },
      res,
      next,
    );
    if (!trip.restaurants.includes(restaurant._id)) {
      trip.restaurants.push(restaurant._id);
      await Trip.updateTripById(
        { params: { id: req.params.id }, body: trip },
        res,
        next,
      );
      res.status(200).json(trip);
    } else {
      throw {
        message: `Restaurant already added to trip`,
        status: 400,
      };
    }
  } catch (err) {
    next(err);
  }
};

const removeRestaurantFromTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    const restaurant = await Restaurant.getRestaurantById(
      { params: { id: req.body.id } },
      res,
      next,
    );
    if (trip.restaurants.includes(restaurant._id)) {
      trip.restaurants.pull(restaurant._id);
      await Trip.updateTripById(
        { params: { id: req.params.id }, body: trip },
        res,
        next,
      );
      res.status(200).json(trip);
    } else {
      throw {
        message: `Restaurant not in trip`,
        status: 400,
      };
    }
  } catch (err) {
    next(err);
  }
};

const addHotelToTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    const hotel = await Hotel.getHotelById(
      { params: { id: req.body.id } },
      res,
      next,
    );
    if (!trip.hotels.includes(hotel._id)) {
      trip.hotels.push(hotel._id);
      await Trip.updateTripById(
        { params: { id: req.params.id }, body: trip },
        res,
        next,
      );
      res.status(200).json(trip);
    } else {
      throw {
        message: `Hotel already added to trip`,
        status: 400,
      };
    }
  } catch (err) {
    next(err);
  }
};

const removeHotelFromTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    const hotel = await Hotel.getHotelById(
      { params: { id: req.body.id } },
      res,
      next,
    );

    if (trip.hotels.includes(hotel._id)) {
      trip.hotels.pull(hotel._id);
      await Trip.updateTripById(
        { params: { id: req.params.id }, body: trip },
        res,
        next,
      );
      res.status(200).json(trip);
    } else {
      throw {
        message: `Hotel not in trip`,
        status: 400,
      };
    }
  } catch (err) {
    next(err);
  }
};

const addAttractionToTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    const attraction = await Attraction.getAttractionById(
      { params: { id: req.body.id } },
      res,
      next,
    );
    if (!trip.attractions.includes(attraction._id)) {
      trip.attractions.push(attraction._id);
      await Trip.updateTripById(
        { params: { id: req.params.id }, body: trip },
        res,
        next,
      );
      res.status(200).json(trip);
    } else {
      throw {
        message: `Attraction already added to trip`,
        status: 400,
      };
    }
  } catch (err) {
    next(err);
  }
};
const removeAttractionFromTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    const attraction = await Attraction.getAttractionById(
      { params: { id: req.body.id } },
      res,
      next,
    );
    if (trip.attractions.includes(attraction._id)) {
      trip.attractions.pull(attraction._id);
      await Trip.updateTripById(
        { params: { id: req.params.id }, body: trip },
        res,
        next,
      );
      res.status(200).json(trip);
    } else {
      throw {
        message: `Attraction not in trip`,
        status: 400,
      };
    }
  } catch (err) {
    next(err);
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
