const Cart = require("../Models/cartModel");
const OrderHistory = require("../Models/orderHistoryModel");
const Product = require("../Models/productModel");

//
//
//
const finalOrder = async (req, res) => {
  try {
    const { product, qty, paymentMethod } = req.body;

    const order = await OrderHistory.create({
      user: req.user._id,
      product: product,
      qty: qty,
      paymentMethod: paymentMethod,
    });

    const itemfromCart = await Cart.find({
      $and: [{ user: req.user._id }, { productId: product }],
    });

    const removeFromCart = await Cart.findByIdAndDelete(itemfromCart[0]._id);

    //

    const productQTY = await Product.findById(product);
    const changeQty = productQTY.qty - qty;
    const changeTotalSoldItems = productQTY.totalSoldItems + qty;
    const findProduct = await Product.findByIdAndUpdate(
      product,
      { $set: { qty: changeQty, totalSoldItems: changeTotalSoldItems } },
      { new: true }
    );

    res.status(200).send("Thank you for your order");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};


//
//
//
const finalOrderD = async (req, res) => {
  try {
    const { product, qty, paymentMethod } = req.body;

    const order = await OrderHistory.create({
      user: req.user._id,
      product: product,
      qty: qty,
      paymentMethod: paymentMethod,
    });

    const itemfromCart = await Cart.find({
      $and: [{ user: req.user._id }, { productId: product }],
    });

    const productQTY = await Product.findById(product);
    const changeQty = productQTY.qty - qty;
    const changeTotalSoldItems = productQTY.totalSoldItems + qty;
    const findProduct = await Product.findByIdAndUpdate(
      product,
      { $set: { qty: changeQty, totalSoldItems: changeTotalSoldItems } },
      { new: true }
    );

    res.status(200).send("Thank you for your order");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};



//
//
//
const cancelOrder = async (req, res) => {
  const {id}=req.body
  try {
    const findOrderHistory = await OrderHistory.findById(id);

    const findProductQTY = await Product.findById(findOrderHistory.product);

    const changeQty = findProductQTY.qty + findOrderHistory.qty;

    const changeTotalSoldItems =
      findProductQTY.totalSoldItems - findOrderHistory.qty;

    const findProductUpdate = await Product.findByIdAndUpdate(
      findProductQTY._id,
      { $set: { qty: changeQty, totalSoldItems: changeTotalSoldItems } },
      { new: true }
    );

    const cancelorderNow = await OrderHistory.findByIdAndUpdate(id, {
      $set: { cancelOrder: true },
    });
 

    res.status(200).send("order is cancel");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

//
//
//
const displayAllOrders = async (req, res) => {
  try {
    const allOrders = await OrderHistory.find({ user: req.user._id }).populate('product');

    res.status(200).json(allOrders);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

//
//
//
const orderAgain = async (req, res) => {
  const {id}=req.body
  try {
    const findOrderHistory = await OrderHistory.findById(id);

    const findProductQTY = await Product.findById(findOrderHistory.product);

    const changeQty = findProductQTY.qty - findOrderHistory.qty;

    const changeTotalSoldItems =
      findProductQTY.totalSoldItems + findOrderHistory.qty;

    const findProductUpdate = await Product.findByIdAndUpdate(
      findProductQTY._id,
      { $set: { qty: changeQty, totalSoldItems: changeTotalSoldItems } },
      { new: true }
    );

    const cancelorderNow = await OrderHistory.findByIdAndUpdate(id, {
      $set: { cancelOrder: false },
    });

    res.status(200).send("Order is placed again");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

//
//
//
const orderIsDeliverd = async (req, res) => {
  try {
     const Order = await OrderHistory.findByIdAndUpdate(req.params.id, {
    $set: { isDeliverd: true },
  });
  res.status(200).send("Order is Delivered");
  } catch (error) {
    res.status(500).send("Internal server error")
  }
 
};

//
//
//
module.exports = {
  finalOrder,
  cancelOrder,
  displayAllOrders,
  orderAgain,
  orderIsDeliverd,
  finalOrderD 
};
