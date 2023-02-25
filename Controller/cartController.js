const Cart = require("../Models/cartModel");

const addToCart = async (req, res) => {
  try {
    
    const { productId, name, pic, price, qty } = req.body;

    const alreadyAdded = await Cart.find({
      $and: [{ user: req.user._id }, { productId: productId }],
    });

   
    if (alreadyAdded[0] && alreadyAdded[0].productId ==  productId) {
      res.status(400).send("Product is already in cart");
    }
    else{
        const cart = await Cart.create({
      user: req.user._id,
      productId: productId,
      name: name,
      pic: pic,
      price: price,
      qty: qty,
    });

    res.status(200).send("Product is successfully add in cart");
    }

    
  } catch (error) {
    console.log(error)
    res.status(500).send("Internal server error");
  }
};



const displayCart = async (req, res) => {
  try {
    const getCart = await Cart.find({ user: req.user._id });

    res.status(200).json(getCart);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const removeFromCart = async (req, res) => {
  try {
    const removeProduct = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).send("Product is remove from cart");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const editQTY=async(req,res)=>{
  const {qty}=req.body
  try {
    const edit=await Cart.findByIdAndUpdate(req.params.id,{$set:{qty:qty}})
    res.status(200).send("Quantity is edited")
  } catch (error) {
    res.status(500).send("Internal server error");
  }
}

module.exports = { addToCart, removeFromCart, displayCart,editQTY };
