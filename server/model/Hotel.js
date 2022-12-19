const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HotelSchema = new Schema({
  location_id: { type: String, unique: true },
  name: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  amenities: { type: Array },
  image: { type: String },
  rating: { type: Number },
});
module.exports = mongoose.model("Hotel", HotelSchema);
