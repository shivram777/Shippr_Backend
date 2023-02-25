const express = require("express");
const router = express.Router();
const { becomeSeller, sellerLogin, getSeller } = require("../Controller/sellerController");
const getSellerID = require("../middleware/authMiddlewareSeller");

router.route("/becomeSeller").post(becomeSeller);
router.route("/sellerLogin").post(sellerLogin);
router.route("/getSeller").get(getSellerID, getSeller);

module.exports = router;
