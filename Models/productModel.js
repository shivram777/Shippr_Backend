const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  pic: { type: String, required: true },
  price: { type: Number, require: true },
  totalQTY: { type: Number, require: true },
  totalSoldItems: { type: Number, default: 0 },
  qty: { type: Number },
  rating: { type: Number, default: 0 },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  stopSelling: { type: Boolean, default: false },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
