const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  name: { type: String },
  category: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  address: { type: String },
  image: { type: String },
  description: { type: String },
  rating: { type: String },
  website: { type: String },
});

module.exports = mongoose.model("Place", PlaceSchema);
