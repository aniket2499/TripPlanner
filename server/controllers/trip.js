const Trip = require("../model/Trip");

const getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    res.status(200).json(trip);
  } catch (err) {
    next(err);
  }
};

const getAllTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (err) {
    next(err);
  }
};

const createTrip = async (req, res, next) => {
  const newTrip = new Trip(req.body);

  try {
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    next;
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

module.exports = {
  getTripById,
  getAllTrips,
  createTrip,
  updateTripById,
  deleteTripById,
};
