const express = require("express");
const pdf = require("html-pdf");
const pdfTemplate = require("../documents");

const router = express.Router();
const {
  getAllTrips,
  getTripById,
  createTrip,
  deleteTripById,
  updateTripById,
  addAttractionToTrip,
  removeAttractionFromTrip,
  addHotelToTrip,
  removeHotelFromTrip,
  addRestaurantToTrip,
  removeRestaurantFromTrip,
  inviteUserToTrip,
  acceptInviteToTrip,
} = require("../controllers/trip");
const { getWeatherForeCastForLocation } = require("../data/weather");

router.post("/:tripId/accept/:userId", async (req, res) => {
  try {
    const trip = await acceptInviteToTrip(req, res);
    res.status(200).json(trip);
  } catch (e) {
    console.log(e);
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const tripsList = await getAllTrips();
    res.status(200).json(tripsList);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const trip = await getTripById(req.params.id);
    res.status(200).json(trip);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.post("/create/:userId", async (req, res) => {
  try {
    const newTrip = await createTrip(req.params.userId, req.body);
    res.status(200).json(newTrip);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedTrip = await deleteTripById(req.params.id);
    res.status(200).json(deletedTrip);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const updatedTrip = await updateTripById(req.params.id, req.body);
    res.status(200).json(updatedTrip);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.patch("/:tripid/attractions/add/:attractionid", async (req, res) => {
  try {
    const trip = await addAttractionToTrip(req, res);
    res.status(200).json(trip);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.patch(
  "/:tripid/attractions/remove/:attractionid/:visitDate",
  async (req, res) => {
    try {
      const trip = await removeAttractionFromTrip(req, res);
      res.status(200).json(trip);
    } catch (e) {
      res.status(e.status ? e.status : 500).json(e);
    }
  },
);

router.patch("/:tripid/hotels/add/:hotelid/", async (req, res) => {
  try {
    const trip = await addHotelToTrip(req, res);
    res.status(200).json(trip);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.patch("/:tripid/hotels/remove/:hotelid/:visitDate", async (req, res) => {
  try {
    const trip = await removeHotelFromTrip(req, res);
    console.log("trip at the backend is: " + trip);
    res.status(200).json(trip);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.patch("/:tripid/restaurants/add/:restaurantid", async (req, res) => {
  try {
    const trip = await addRestaurantToTrip(req, res);
    res.status(200).json(trip);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.patch(
  "/:tripid/restaurants/remove/:restaurantid/:visitDate",
  async (req, res) => {
    try {
      const trip = await removeRestaurantFromTrip(req, res);
      res.status(200).json(trip);
    } catch (e) {
      res.status(e.status ? e.status : 500).json(e);
    }
  },
);

router.post("/:id/invite", async (req, res) => {
  // console.log(req.body);
  try {
    const trip = await inviteUserToTrip(req, res);
    res.status(200).json(trip);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.get(`/weather/data/:date/:lat/:lng`, async (req, res) => {
  try {
    console.log(req.params);
    const weatherData = await getWeatherForeCastForLocation(
      //sending today's date as default
      req.params.date,
      req.params.lat,
      req.params.lng,
    );
    res.status(200).json(weatherData);
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.post("/trips/pdf", async (req, res) => {
  console.log("creating pdf");

  try {
    pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
      if (err) {
        console.log(err);
        res.send(Promise.reject());
      }
      res.send(Promise.resolve());
    });
  } catch (e) {
    res.status(e.status ? e.status : 500).json(e);
  }
});

router.get("/fetch/pdf", (req, res) => {
  console.log("fetching pdf");
  console.log(res.data);
  try {
    res.sendFile(`${__dirname}/result.pdf`);
  } catch (e) {
    console.log(e.stack);
    res.status(e.status ? e.status : 500).json(e);
  }
});

module.exports = router;
