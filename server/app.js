const express = require("express");
const mongoose = require("mongoose");
const Users = require("./model/Users");
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

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
