const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, trim: true },
  passwordHash: { type: String, required: true },
  document: { type: String, required: true },
  address: new mongoose.Schema({
    street: { type: String, required: true, trim: true },
    neighbourhood: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
    number: { type: String, required: true, trim: true },
  }),
  birthDate: { type: Date },
  phoneNumber: { type: String, trim: true },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    required: true,
    default: "USER",
  },
});

module.exports = mongoose.model("User", UserSchema);
