const express = require("express");
const mongoose = require("mongoose");
// const Users = require("./model/Users");
const Trips = require("./model/Trips");
const Hotels = require("./model/Hotels");
require("dotenv").config();

const app = express();
app.use(express.json());

const port = 3001;
const uri = process.env.MONGODB_CONNNECTION_STRING;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// app.post("/users", async (req, res) => {
//   try {
//     const User = new Users({
//       FirstName: req.body.FirstName,
//       LastName: req.body.LastName,
//       Email: req.body.Email,
//       Password: req.body.Password,
//       DateOfBirth: req.body.DateOfBirth,
//     });
//     await Users.create(User);

//     res.status(201).send(User);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// app.post("/trips", async (req, res) => {
//   try {
//     // const invites = req.body.invites.map((invite) => {
//     //     return {
//     //         email: invite.email,
//     //         name: invite.name
//     //     }
//     // });
//     const Trip = new Trips({
//       tripName: req.body.tripName,
//       location: req.body.location,
//       destination: req.body.destination,
//       tripDate: {
//         startDate: req.body.tripDate.startDate,
//         endDate: req.body.tripDate.endDate,
//       },
//       invites: [],
//       notes: req.body.notes,
//       explore: [],
//       placesToVisit: [],
//       itinerary: [],
//       hotels: [],
//       restaurants: [],
//       attractions: [],
//     });
//     await Trips.create(Trip);
//     res.status(201).send(Trip);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

app.post("/hotels", async (req, res) => {
  try {
    const Hotel = new Hotels({
      name: req.body.name,
      category: req.body.category,
      image: req.body.image,
      location: req.body.location,
      link: req.body.link,
      rating: req.body.rating,
      review: req.body.review,
      pricing: req.body.pricing,
    });
    await Hotels.create(Hotel);
    res.status(201).send(Hotel);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
