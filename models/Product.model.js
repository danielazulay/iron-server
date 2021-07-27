const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  unity: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true, maxlength: 200 },
  category: {
    type: String,
    required: true,
    enum: ["leve", "Maltadas", "Lupuladas","Torradas","Frutadas","Sem Alccol","Sem Glutem"],
  },
  alccol: { type: String, required: true },
  size: { type: String, enum: ["310", "330", "355", "500","600"] },
  userid: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  bestUse:{type: Date},
  img: { type: String, trim: true },
});




module.exports = mongoose.model("Product", ProductSchema);
