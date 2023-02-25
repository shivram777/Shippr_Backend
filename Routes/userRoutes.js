const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getUser,
  deleteUser,
  updateUser,
} = require("../Controller/userController");
const getUserID = require("../middleware/authMiddleware");

//
router.route("/").post(createUser).get(getUserID, getUser);
router.route("/login").post(loginUser);
router.route("/deleteUser").delete(getUserID, deleteUser);
router.route("/updateUser").put(getUserID, updateUser);

module.exports = router;
