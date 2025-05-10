const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Auth Routes

router.post("/register", registerUser); // register a new user
router.post("/login", loginUser); // login user
router.get("/profile", protect, getUserProfile); // get user profile
router.put("/profile", protect, updateUserProfile); // update user prfile

module.exports = router;
