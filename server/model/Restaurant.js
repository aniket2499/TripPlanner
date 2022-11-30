const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RestaurantSchema = new Schema({
  name: { type: String },
  category: { type: String },
  image: { type: String },
  location: { type: String },
  link: { type: String },
  cuisine: { type: Array },
  rating: { type: String },
  review: { type: String },
  description: { type: String },
  contact: { type: String },
  pricing: { type: String },
});
module.exports = mongoose.model("Restaurant", RestaurantSchema);
