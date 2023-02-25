const express = require("express");
const {
  finalOrder,
  cancelOrder,
  displayAllOrders,
  orderAgain,
  orderIsDeliverd,
  finalOrderD,
} = require("../Controller/orderHistoryController");
const getUserID = require("../middleware/authMiddleware");



const router = express.Router();

router.route("/finalOrder").post(getUserID, finalOrder);
router.route("/finalOrderD").post(getUserID, finalOrderD);
router.route("/cancelOrder").post(getUserID, cancelOrder);
router.route("/displayAllOrders").get(getUserID, displayAllOrders);
router.route("/orderAgain").post(getUserID, orderAgain);
router.route("/orderIsDelivered").put(getUserID, orderIsDeliverd);

module.exports = router;
