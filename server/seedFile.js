const express = require("express");
const mongoose = require("mongoose");
const Users = require("./model/User");
const Trips = require("./model/Trip");
const Hotels = require("./model/Hotel");
const Restaurants = require("./model/Restaurant");
const Attractions = require("./model/Attraction");
const Places = require("./model/Place");
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

app.post("/users", async (req, res) => {
  try {
    const User = new Users({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      dateOfBirth: req.body.dateOfBirth,
    });
    await Users.create(User);

    res.status(201).send(User);
  } catch (e) {
    res.status(400).send(e);
  }
});

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

// app.post("/hotels", async (req, res) => {
//   try {
//     const Hotel = new Hotels({
//       name: req.body.name,
//       category: req.body.category,
//       image: req.body.image,
//       location: req.body.location,
//       link: req.body.link,
//       rating: req.body.rating,
//       review: req.body.review,
//       pricing: req.body.pricing,
//     });
//     await Hotels.create(Hotel);
//     res.status(201).send(Hotel);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// app.post("/restaurants", async (req, res) => {
//   try {
//     const Restaurant = new Restaurants({
//       name: req.body.name,
//       category: req.body.category,
//       image: req.body.image,
//       location: req.body.location,
//       link: req.body.link,
//       cuisine: req.body.cuisine,
//       rating: req.body.rating,
//       review: req.body.review,
//       description: req.body.description,
//       contact: req.body.contact,
//       pricing: req.body.pricing,
//     });
//     await Restaurants.create(Restaurant);
//     res.status(201).send(Restaurant);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// app.post("/attractions", async (req, res) => {
//   try {
//     const Attraction = new Attractions({
//       name: req.body.name,
//       category: req.body.category,
//       imagesURL: req.body.imagesURL,
//       location: req.body.location,
//       link: req.body.link,
//       rating: req.body.rating,
//       description: req.body.description,
//     });
//     await Attractions.create(Attraction);
//     res.status(201).send(Attraction);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// app.post("/places", async (req, res) => {
//   try {
//     const Place = new Places({
//       name: req.body.name,
//       category: req.body.category,
//       imagesURL: req.body.imagesURL,
//       location: req.body.location,
//       link: req.body.link,
//       rating: req.body.rating,
//       description: req.body.description,
//     });
//     await Places.create(Place);
//     res.status(201).send(Place);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
