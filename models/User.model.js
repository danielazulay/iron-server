const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, trim: true },
  passwordHash: { type: String, required: true },
  document: { type: String, required: true },
  // eddress: new mongoose.Schema({
  //   street: { type: String, required: true, trim: true },
  //   neighbourhood: { type: String, required: true, trim: true },
  //   city: { type: String, required: true, trim: true },
  //   state: { type: String, required: true, trim: true },
  //   postalCode: { type: String, required: true, trim: true },
  //   number: { type: String, required: true, trim: true },
  // }),
  // birthDate: { type: Date, required: true },
  // phoneNumber: { type: String, trim: true },
});

module.exports = mongoose.model("User", UserSchema);
