const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TripSchema = new Schema({
  tripName: { type: String },
  cur_location: { type: String, required: true },
  destination: { type: String, required: true },
  tripDate: {
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
  },
  users: [{ type: String, ref: "User" }],
  image: { type: String },

  invites: [
    {
      email: { type: String },
      name: { type: String },
    },
  ],
  notes: { type: String },
  explore: [
    {
      id: { type: String },
      image: { type: String },
      title: { type: String },
      link: { type: String },
    },
  ],
  placesToVisit: [{ type: Schema.Types.ObjectId, ref: "Places" }],
  itinerary: [
    {
      date: { type: String },
      weatherDetails: {
        temperature: { type: String },
        description: { type: String },
        icon: { type: String },
        weather: { type: String },
      },
      placesToVisit: [{ type: String }],
    },
  ],
  hotels: [{ type: Schema.Types.ObjectId, ref: "Hotels" }],
  restaurants: [{ type: Schema.Types.ObjectId, ref: "Restaurants" }],
  attractions: [{ type: Schema.Types.ObjectId, ref: "Attractions" }],
});

module.exports = mongoose.model("Trip", TripSchema);
