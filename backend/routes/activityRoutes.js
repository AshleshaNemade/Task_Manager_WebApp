const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getActivityLogs,
} = require("../controllers/activityController");

// Admin only
router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getActivityLogs
);

module.exports = router;