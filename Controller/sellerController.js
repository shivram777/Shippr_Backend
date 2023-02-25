const Seller = require("../Models/sellerModel");
const generateToken = require("../utils/generateToken");

//@desc     becomeSeller/Signup
//@route    POST /seller/api/becomeSeller

const becomeSeller = async (req, res) => {
  try {
    const { name, email, password, companyName, companyAddress } = req.body;

    const ExistSeller = await Seller.findOne({ email });

    if (ExistSeller) {
      res.status(401).send("Seller is already exists");
    }

    const seller = await Seller.create({
      name: name,
      email: email,
      password: password,
      companyName: companyName,
      companyAddress: companyAddress,
      productsId: [],
    });

    if (seller) {
      res.status(201).json({
        _id: seller._id,
        name: seller.name,
        email: seller.email,
        password: seller.password,
        companyName: seller.companyName,
        companyAddress: seller.companyAddress,
        token: generateToken(seller._id),
      });
    }
  } catch (error) {
    res.status(401).send("Please fill correct Info");
  }
};

//@desc    sellerLogin
//@route    POST /seller/api/sellerLogin

const sellerLogin = async (req, res) => {
  const { email, password } = req.body;

  const seller = await Seller.findOne({ email });

  if (seller && (await seller.matchPassword(password))) {
    res.status(201).json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      companyName: seller.companyName,
      companyAddress: seller.companyAddress,
      token: generateToken(seller._id),
    });
  } else {
    res.status(400).send("Invalid email or password");
  }
};

const getSeller = async (req, res) => {
  try {
    const seller = await Seller.findById(req.user._id)
      .select("-password")
      .populate("productsId");

    res.status(200).json(seller);
  } catch (error) {
    res.status(400).send("Seller not Found");
  }
};

module.exports = { becomeSeller, sellerLogin, getSeller };
