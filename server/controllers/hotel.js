const Hotel = require("../model/Hotel");
const data = require("../data/data.js");

const getHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

const getHotelsFromApi = async (req, res, next) => {
  let page = req.params.pg;
  let latitude = req.params.latitude;
  let longitude = req.params.longitude;

  try {
    const hotel = data.getAllHotels(latitude, longitude, page);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

const updateHotelById = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (err) {
    next(err);
  }
};

const deleteHotelById = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json(`Hotel on ID (${req.params.id}) has been deleted...`);
  } catch (err) {
    next(err);
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
