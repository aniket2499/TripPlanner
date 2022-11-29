const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TripsSchema = new Schema({
  tripName: { type: String, required: true },
  location: { type: String, required: true },
  destination: { type: String, required: true },
  tripDate: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
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
      date: { type: Date, required: true },
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

module.exports = mongoose.model("Trips", TripsSchema);
