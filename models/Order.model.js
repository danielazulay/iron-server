const mongoose = require("mongoose")


const OrderSchema = new mongoose.Schema({
    userid:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productid:[{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
})

module.exports = mongoose.model("Order", OrderSchema);