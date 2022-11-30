const attractionsRoute = require("./attractions");
const usersRoute = require("./users");
const authRoute = require("./auth");
const hotelsRoute = require("./hotels");
const placesRoute = require("./places");
const restaurantsRoute = require("./restaurants");
const tripsRoute = require("./trips");
const flightsRoute = require("./flights");

module.exports = async (app) => {
  app.use("/api/attractions", attractionsRoute);
  app.use("/api/users", usersRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/hotels", hotelsRoute);
  app.use("/api/places", placesRoute);
  app.use("/api/restaurants", restaurantsRoute);
  app.use("/api/trips", tripsRoute);
  app.use("/api/flights", flightsRoute);
  app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });
};
