const JWT = require("jsonwebtoken");
const User = require("../Models/userModel");

const getUserID = async (req, res,next) => {
  let token = req.headers.authorization;

  if (!token) {
    res.status(401).send("Not Authorized , token failed");
  }

  try {
    if (token) {
      const decoded = JWT.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
console.log
      next();
    }
  } catch (error) {
    res.status(401).send("Not authorized try again")
  }
};

module.exports = getUserID;
