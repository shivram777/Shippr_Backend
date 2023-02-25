const JWT = require("jsonwebtoken");
const Seller = require("../Models/sellerModel");

const getSellerID = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    res.status(401).send("Not Authorized , token failed");
  }

  try {
    if (token) {
      const decoded = JWT.verify(token, process.env.JWT_SECRET);

      req.user = await Seller.findById(decoded.id).select("-password");

      next();
    }
  } catch (error) {
    res.status(401).send("Not authorized try again");
  }
};

module.exports = getSellerID;
