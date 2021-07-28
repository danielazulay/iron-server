const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    products: [
        new mongoose.Schema(
          {
            qtt: Number,
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          },
          { _id: false }
        ),
      ],
    orderDate: { type: Date, default: Date.now },
    userid:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
    value: { type: Number,default: 0},
    payment:{type: String ,enum:["credit","debit", "check"]},
    paymentStatus:{type: String ,enum:["pending","payed"],default:"pending"}
})

module.exports = mongoose.model("Order", OrderSchema);
