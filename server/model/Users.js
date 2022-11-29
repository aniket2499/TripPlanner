const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UsersSchema = new Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true, unique: true, dropDups: true },
  Password: { type: String, required: true },
  DateOfBirth: { type: Date, required: true },
});

module.exports = mongoose.model("Users", UsersSchema);
