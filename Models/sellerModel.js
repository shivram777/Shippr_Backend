const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const sellerSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true },
  companyAddress: { type: String, required: true },
  productsId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

sellerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;
