const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  name: { type: String },
  category: { type: String },
  location: { type: String },
  imagesURL: { type: String },
  description: { type: String },
  rating: { type: String },
  link: { type: String },
});

module.exports = mongoose.model("Place", PlaceSchema);
