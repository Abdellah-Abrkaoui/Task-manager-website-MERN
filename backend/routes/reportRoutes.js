const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  exportTaskReport,
  exportUserReport,
} = require("../controllers/reportController");

const router = express.Router();

router.get("/export/tasks", protect, adminOnly, exportTaskReport); //Export all tasks as Excel/PDF
router.get("/export/users", protect, adminOnly, exportUserReport); //Export all tasks as Excel/PDF

module.exports = router;
