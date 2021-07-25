const mongoose = require("mongoose")


const OrderSchema = new mongoose.Schema({
    orderDate: { type: Date, default: Date.now },
    userid:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productid:[{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
})

module.exports = mongoose.model("Order", OrderSchema);