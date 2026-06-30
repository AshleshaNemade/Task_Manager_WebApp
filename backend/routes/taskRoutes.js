const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    createNewTask,
    getTasks,
} = require("../controllers/taskController");

// Create Task
router.post("/", protect, createNewTask);

// Get Tasks
router.get("/", protect, getTasks);

module.exports = router;