const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const configRoutes = require("./routes");
const configMiddlewares = require("./routes/middlewares");
require("dotenv").config();

const app = express();
dotenv.config();

const port = 3001;
const uri = process.env.MONGODB_CONNNECTION_STRING;

const connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(
  session({
    name: "AuthCookie",
    secret: "This is A Secret Key for Signing Cookies",
    resave: false,
    saveUninitialized: true,
  }),
);

// configMiddlewares(app);
configRoutes(app);

app.listen(port, () => {
  connect();
  console.log(`Server running on port http://localhost:${port}`);
});
