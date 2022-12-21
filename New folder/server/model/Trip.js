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

  destCord: {
    lat: { type: String },
    long: { type: String },
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
      date: { type: String },
      weatherDetails: {
        temperature: { type: String },
        description: { type: String },
        icon: { type: String },
        weather: { type: String },
      },
      placesToVisit: [
        {
          id: { type: String },
          name: { type: String },
          image: { type: String },
          type: { type: String },
        },
      ],
    },
  ],
  hotels: [{ type: String, ref: "Hotels" }],
  restaurants: [{ type: String, ref: "Restaurants" }],
  attractions: [{ type: String, ref: "Attractions" }],
});

module.exports = mongoose.model("Trip", TripSchema);
