const Place = require("../model/Place");

const getPlaceById = async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);
    res.status(200).json(place);
  } catch (err) {
    next(err);
  }
};

const getAllPlaces = async (req, res, next) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (err) {
    next(err);
  }
};

const createPlace = async (req, res) => {
  const newPlace = new Place(req.body);

  try {
    const savedPlace = await newPlace.save();
    res.status(201).json(savedPlace);
  } catch (error) {
    next;
  }
};

const updatePlacebyId = async (req, res) => {
  try {
    const updatePlace = await Place.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatePlace);
  } catch (err) {
    next(err);
  }
};

const deletePlaceById = async (req, res) => {
  try {
    await Place.findByIdAndDelete(req.params.id);
    res.status(200).json(`Place on ID (${req.params.id}) has been deleted...`);
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
