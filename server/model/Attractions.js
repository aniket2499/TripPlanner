const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AttractionsSchema = new Schema({
  name: { type: String },
  category: { type: String },
  location: { type: String },
  imagesURL: { type: String },
  description: { type: String },
  rating: { type: Number },
  link: { type: String },
});
module.exports = mongoose.model("Attractions", AttractionsSchema);
