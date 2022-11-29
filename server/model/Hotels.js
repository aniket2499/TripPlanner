const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HotelsSchema = new Schema({
  name: { type: String },
  category: { type: String },
  image: { type: String },
  location: { type: String },
  link: { type: String },
  rating: { type: Number },
  review: { type: String },
  pricing: { type: Number },
});
module.exports = mongoose.model("Hotels", HotelsSchema);
