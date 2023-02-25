const OrderHistory = require("../Models/orderHistoryModel");
const Product = require("../Models/productModel");
const Review = require("../Models/reviewModel");

//
//
const createReview = async (req, res) => {
  try {
    const { rating, comment, productId, OrderId } = req.body;

    const checkReview = await Review.findOne({
      user: req.user._id,
      productId: productId,
      orderId: OrderId,
    });

    if (checkReview) {
      res.status(403).send("Review is already exists");
    }
    const OrderedProduct = await OrderHistory.findById(OrderId);

    if (OrderedProduct.cancelOrder === false) {
      const review = await Review.create({
        user: req.user._id,
        rating: rating,
        comment: comment,
        productId: productId,
        orderId: OrderId,
      });

      const findReviewProductWise = await Review.find({ productId: productId });

      const countRating =
        findReviewProductWise.reduce((acc, item) => item.rating + acc, 0) /
        findReviewProductWise.length;

      const findProductForRating = await Product.findByIdAndUpdate(productId, {
        $set: { rating: countRating },
      });

      res.status(200).send("Review is created");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

//
//
const displayReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.id }).populate('user');

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};


//
//
//
const displayUserReviews = async (req, res) => {
  try {
    const findReviewsOfUser = await Review.find({
      user: req.user._id,
      orderId: req.params.id,
    });

    res.status(200).json(findReviewsOfUser);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

//
//
//
const updateReview = async (req, res) => {
  const { reviewId, rating, comment } = req.body;

  const editReview = await Review.findByIdAndUpdate(
    reviewId,
    {
      $set: { rating: rating, comment: comment },
    },
    { new: true }
  );

  const findReviewProductWise = await Review.find({
    productId: editReview.productId,
  });

  const countRating =
    findReviewProductWise.reduce((acc, item) => item.rating + acc, 0) /
    findReviewProductWise.length;

  const findProductForRating = await Product.findByIdAndUpdate(
    editReview.productId,
    {
      $set: { rating: countRating },
    }
  );

  res.status(200).json(editReview);
};

const findReviewEx = async (req, res) => {
  const { productId } = req.body;
  try {
    const dataF = await Review.find({
      productId: productId,
      user: req.user._id,
    });

    if (dataF.length) {
      res.status(200).send(true);
    } else {
      res.status(200).send(false);
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  createReview,
  displayReviews,
  displayUserReviews,
  updateReview,
  findReviewEx,
};
