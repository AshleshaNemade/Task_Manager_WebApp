const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const {
    createNewTask,
    getTasks,
    editTask,
    removeTask
} = require("../controllers/taskController");

const validate = require("../middleware/errorMiddleware");

const {
  taskValidation,
} = require("../validators/taskValidator");

// Create Task
router.post("/", protect, taskValidation, validate, createNewTask);

// Get Tasks
router.get("/", protect, getTasks);

//update task
router.put("/:id", protect, taskValidation, validate, editTask);

// Delete Task
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    removeTask
);

module.exports = router;