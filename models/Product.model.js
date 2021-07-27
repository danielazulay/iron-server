const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  validity: { type: Date, trim: true },
  unity: { type: Number, required: true },
  description: { type: String, required: true, maxlength: 200 },
  category: {
    type: String,
    required: true,
    enum: ["IPA", "Larger", "Pilsen"],
  },
  size: { type: String, enum: ["350ml", "600ml", "1l"] },
  userid: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  img: { type: String, trim: true },
});

ProductSchema.index({ "name": "text", "description": "text" });

module.exports = mongoose.model("Product", ProductSchema);
