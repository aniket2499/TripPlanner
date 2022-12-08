const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  _id: { type: String, required: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  trips: [{ type: Schema.Types.ObjectId, ref: "Trips" }],
});
console.log("UserSchema");
console.log(UserSchema);
module.exports = mongoose.model("User", UserSchema);
