const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  getAllUsers,
  getUpdatedUser,
  getOrders,
} = require("../controllers/user");

const { isSignedin, isAdmin, isAuthorised } = require("../controllers/auth");

router.param("userId", getUserById);
router.get("/user/:userId", isSignedin, isAuthorised, isAdmin, getUser);
router.get("/users", getAllUsers);
router.put("/users/:userId", getUpdatedUser);
router.get("orders/user/:userId", getOrders);
module.exports = router;
