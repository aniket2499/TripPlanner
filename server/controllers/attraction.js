const Attraction = require("../model/Attraction");
const data = require("../data/data.js");

const getAttractionById = async (req, res, next) => {
  try {
    const attraction = await Attraction.findById(req.params.id);
    res.status(200).json(attraction);
  } catch (err) {
    next(err);
  }
};

const getAttractionsFromApi = async (req, res, next) => {
  let page = req.params.pg;
  let location_code = req.params.code;
  try {
    const attractions = await data.getAllAttractions(location_code, page);
    res.status(200).json(attractions);
  } catch (err) {
    next(err);
  }
};

const getAllAttractions = async (req, res, next) => {
  try {
    const attractions = await Attraction.find();
    res.status(200).json(attractions);
  } catch (err) {
    next(err);
  }
};

const createAttraction = async (req, res, next) => {
  const newAttraction = new Attraction(req.body);

  try {
    const savedAttraction = await newAttraction.save();
    res.status(201).json(savedAttraction);
  } catch (err) {
    next(err);
  }
};

const updateAttractionById = async (req, res, next) => {
  try {
    const updateAttraction = await Attraction.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateAttraction);
  } catch (err) {
    next(err);
  }
};

const deleteAttractionById = async (req, res, next) => {
  try {
    await Attraction.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json(`Attraction on ID (${req.params.id}) has been deleted...`);
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
