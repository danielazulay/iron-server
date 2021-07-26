const mongoose = require("mongoose")


const OrderSchema = new mongoose.Schema({

    orderDate: { type: Date, default: Date.now },
    userid:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productid:[{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    value: { type: Number,default: 0},
})

module.exports = mongoose.model("Order", OrderSchema);