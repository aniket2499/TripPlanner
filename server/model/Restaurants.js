const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RestaurantsSchema = new Schema({
  name: { type: String },
  category: { type: String },
  image: { type: String },
  location: { type: String },
  link: { type: String },
  cuisine: { type: Array },
  rating: { type: Number },
  review: { type: String },
  description: { type: String },
  contact: { type: String },
  pricing: { type: Number },
});
module.exports = mongoose.model("Restaurants", RestaurantsSchema);
