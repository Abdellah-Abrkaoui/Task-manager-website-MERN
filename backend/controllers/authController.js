const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// generate JWT token

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// @desc Register a new user
// @route POST /api/auth/register
// @access Public

const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl, adminInviteToken } =
      req.body;

    // check if user exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User Already exist" });
    }

    // determine user role : admin if correct token is provided , otherwise member
    let role = "member";
    if (
      adminInviteToken &&
      adminInviteToken == process.env.ADMIN_INVITE_TOKEN
    ) {
      role = "admin";
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
      role,
    });

    // Return User data with jwt
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Login user
// @route POST /api/auth/login
// @access Public

const loginUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc get user pfile
// @route POST /api/auth/profile
// @access Private (require JWT)

const getUserProfile = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Update user profile
// @route POST /api/auth/profile
// @access Private (require JWT)

const updateUserProfile = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
