const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  dateOfBirth: { type: String, required: false },
  trips: [{ type: Schema.Types.ObjectId, ref: "Trips" }],
});

module.exports = mongoose.model("User", UserSchema);
