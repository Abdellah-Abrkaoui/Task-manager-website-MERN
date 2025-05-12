const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  getDashboardData,
  getUserDashboardData,
  getTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
} = require("../controllers/taskController");

const router = express.Router();

// Tasks management routes

router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); // get all tasks (admin : all, User : assigned)
router.get("/:id", protect, getTasksById); // get task by id
router.post("/", protect, adminOnly, createTask); // create task (by admin only)
router.put("/:id", protect, updateTask); // update task detail
router.delete("/:id", protect, deleteTask); // delete a task (by admin only)
router.put("/:id/status", protect, updateTaskStatus); // update task status
router.put("/:id/todo", protect, updateTaskChecklist); // update task checklist

module.exports = router;
