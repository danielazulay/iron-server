const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  color: { type: String, trim: true },
  unity: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true, maxlength: 200 },
  category: {
    type: String,
    required: true,
    enum: ["eletronics", "kitchen Appliances", "clothings"],
  },
  size: { type: String, enum: ["XS", "SM", "L", "XL"] },
  userid: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  img: { type: String, trim: true },
});




module.exports = mongoose.model("Product", ProductSchema);
