const express = require("express");
const {
  createReview,
  displayReviews,
  displayUserReviews,
  updateReview,
  findReviewEx,
} = require("../Controller/reviewController");
const getUserID = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/createReview").post(getUserID, createReview);
router.route("/reviewEx").post(getUserID,findReviewEx);
router.route("/getReviews/:id").get(displayReviews);
router.route("/displayUserReviews/:id").get(getUserID, displayUserReviews);
router.route("/updateReview").put(getUserID, updateReview);
module.exports = router;
