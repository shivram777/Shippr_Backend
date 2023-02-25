const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: { type: String, required: true },
  pic: { type: String, required: true },
  price: { type: Number, require: true },
  qty: { type: Number, required: true },
});

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
