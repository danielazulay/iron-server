const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: [
    mongoose.Schema(
      {
        qtt: Number,
        productid: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      },
      { _id: false }
    ),
  ],

  orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
