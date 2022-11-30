const Attraction = require("../model/Attraction");

const getAttractionById = async (req, res, next) => {
  try {
    const attraction = await Attraction.findById(req.params.id);
    res.status(200).json(attraction);
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

const createAttraction = async (req, res) => {
  const newAttraction = new Attraction(req.body);

  try {
    const savedAttraction = await newAttraction.save();
    res.status(201).json(savedAttraction);
  } catch (error) {
    next;
  }
};

const updateAttractionById = async (req, res) => {
  try {
    const updateAttraction = await Attraction.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updateAttraction);
  } catch (err) {
    next(err);
  }
};

const deleteAttractionById = async (req, res) => {
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
};
