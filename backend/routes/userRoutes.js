const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getUsers, getUserById } = require("../controllers/userController");

const router = express.Router();

// User management routes

router.get("/", protect, adminOnly, getUsers); // get All users (admin only)
router.get("/:id", protect, getUserById); // get specific users
// router.delete("/:id", protect, adminOnly, deleteUser); // delete users (admin only)

module.exports = router;
