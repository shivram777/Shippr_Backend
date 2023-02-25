const generateToken = require("../utils/generateToken");
const User = require("../Models/userModel");

//@desc    Signup
//@route    POST /user/api/
const createUser = async (req, res) => {
  try {
    const { name, password, email, address, pic } = req.body;

    const ExistUser = await User.findOne({ email });

    if (ExistUser) {
      res.status(400);
      throw new Error("user is already exists");
    }

    const user = await User.create({
      name: name,
      password: password,
      email: email,
      address: {
        street: address.street,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
      },
      pic: pic,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).send("Please fill correct Info");
    }
  } catch (error) {
    res.status(500).send("Internal server Error");
  }
};

//@desc    login
//@route    POST /user/api/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("Invalid email or password");
  }
};

//@desc getUser
//route /user/api/

const getUser = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(401).send("user not found");
  }
};

//@desc deleteUser
//route /user/api/deleteUser/
const deleteUser = async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.user._id);

    res.status(201).send("User is Deleted");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

//@desc deleteUser
//route /user/api/updateUser/
const updateUser = async (req, res) => {
  const { address } = req.body;

  try {
    if (address) {
      const newUserI = await User.findByIdAndUpdate(
        req.user._id,
        { $set: { address: address } },
        { new: true }
      );
      res.status(201).json(newUserI);
    }
  } catch (error) {
    res.status(500).send("Internal server Error.");
  }
};

module.exports = { createUser, loginUser, getUser, deleteUser, updateUser };
