const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HotelSchema = new Schema({
  location_id: { type: String },
  name: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  num_reviews: { type: String },
  category: { type: String },
  image: { type: String },
  address: { type: String },
  web_url: { type: String },
  rating: { type: String },
  price_level: { type: String },
  phone: { type: String },
  price: { type: String },
  amenities: { type: Array },
});
module.exports = mongoose.model("Hotel", HotelSchema);
