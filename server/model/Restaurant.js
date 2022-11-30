const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RestaurantSchema = new Schema({
  location_id: { type: String, required: true },
  name: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  num_reviews: { type: String },
  address: { type: String },
  category: { type: String },
  image: { type: String },
  web_url: { type: String },
  cuisine: { type: Array },
  rating: { type: String },
  price_level: { type: String },
  description: { type: String },
  phone: { type: String },
  price: { type: String },
  website: { type: String },
});
module.exports = mongoose.model("Restaurant", RestaurantSchema);
