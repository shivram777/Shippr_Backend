const Product = require("../Models/productModel");
const Seller = require("../Models/sellerModel");

const addProduct = async (req, res) => {
  try {
    const { name, description, pic, price, totalQTY, brand, category } =
      req.body;
    if (
      !name ||
      !description ||
      !pic ||
      !totalQTY ||
      !price ||
      !brand ||
      !category
    ) {
      res.status(401).send("Please fill all info about product");
    }

    const product = await Product.create({
      sellerId: req.user._id,
      name: name,
      description: description,
      pic: pic,
      price: price,
      totalQTY: totalQTY,
      qty: totalQTY,
      brand: brand,
      category: category,
    });

    const seller = await Seller.findByIdAndUpdate(
      req.user._id,
      {
        $push: { productsId: product._id },
      },
      { new: true }
    ).populate("productsId");

    res.status(201).json(seller);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const removeProduct = async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id);

    const seller = await Seller.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { productsId: req.params.id },
      },
      { new: true }
    );

    res.status(200).json(seller);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const stopSellingProduct = async (req, res) => {
  const { id } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, {
      $set: { stopSelling: true },
    });
    res.status(200).send('Product not available for customers')
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const startSellingProduct=async(req,res)=>{
  const { id } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, {
      $set: { stopSelling: false },
    });
    res.status(200).send('Product available for customers')
  } catch (error) {
    res.status(500).send("Internal server error");
  }
}

const getProductByCategory = async (req, res) => {
  try {
    const { category } = req.body;

    const product = await Product.find({ category }).limit(8);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send("Product not found");
  }
};

const getProductBySearch = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: "i" } },
            { category: { $regex: req.query.keyword, $options: "i" } },
            { brand: { $regex: req.query.keyword, $options: "i" } },
          ],
        }
      : {};

    const product = await Product.find(keyword);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const getProductByBrand = async (req, res) => {
  try {
    const { brand } = req.body;

    const Products = await Product.find({ brand: brand });

    res.status(200).json(Products);
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
};

module.exports = {
  addProduct,
  removeProduct,
  getProductByCategory,
  getProductById,
  getProductBySearch,
  getProductByBrand,
  stopSellingProduct,
  startSellingProduct
};
