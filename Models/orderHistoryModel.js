const mongoose = require("mongoose");

const orderHistorySchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  qty: { type: Number, required: true, default: 1 },
  isDeliverd: { type: Boolean, default: false },
  paymentMethod: { type: String },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  cancelOrder: { type: Boolean, default: false },
});

const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);

module.exports = OrderHistory;
