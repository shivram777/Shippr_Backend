const express = require("express");
const getUserID = require("../middleware/authMiddleware");
const router = express.Router();
const {
  addProduct,
  removeProduct,
  getProductByCategory,
  getProductById,
  getProductBySearch,
  getProductByBrand,
  stopSellingProduct,
  startSellingProduct,
} = require("../Controller/productController");
const getSellerID = require("../middleware/authMiddlewareSeller");

router.route("/addProduct").post(getSellerID, addProduct);
router.route("/removeProduct/:id").delete(getSellerID, removeProduct);
router.route("/stopSelling").post(getSellerID,stopSellingProduct);
router.route("/startSelling").post(getSellerID,startSellingProduct)
router.route("/getProductByCategory").post(getProductByCategory);
router.route("/getProductById/:id").get(getProductById);
router.route("/getProductBySearch").get(getProductBySearch);
router.route("/getProductByBrand").post(getProductByBrand);

module.exports = router;
