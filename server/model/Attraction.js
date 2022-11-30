const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AttractionSchema = new Schema({
  location_id: { type: String },
  name: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  num_reviews: { type: String },
  category: { type: String },
  address: { type: String },
  image: { type: String },
  description: { type: String },
  rating: { type: String },
  web_url: { type: String },
  phone: { type: String },
  website: { type: String },
});
module.exports = mongoose.model("Attraction", AttractionSchema);
