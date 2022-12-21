const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HotelSchema = new Schema(
  {
    location_id: { type: String },
    name: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    amenities: { type: Array },
    image: { type: String },
    rating: { type: Number },
  },
  // {
  //   _id: false,
  // },
);
HotelSchema.index({
  location_id: true,
});
module.exports = mongoose.model("Hotel", HotelSchema);
