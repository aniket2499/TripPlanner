const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlacesSchema = new Schema({
  name: { type: String },
  category: { type: String },
  location: { type: String },
  imagesURL: { type: String },
  description: { type: String },
  rating: { type: NumberString },
  link: { type: String },
});

module.exports = mongoose.model("Places", PlacesSchema);
