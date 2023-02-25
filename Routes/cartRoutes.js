const express = require("express");
const {
  addToCart,
  removeFromCart,
  displayCart,
  editQTY,
} = require("../Controller/cartController");
const getUserID = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/addToCart").post(getUserID, addToCart);
router.route("/removeFromCart/:id").delete(getUserID, removeFromCart);
router.route("/displayCart").get(getUserID, displayCart);
router.route("/Editqty/:id").put(getUserID,editQTY)

module.exports = router;
