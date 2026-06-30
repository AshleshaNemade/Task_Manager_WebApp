const express = require("express");

const router = express.Router();

const {
  register,
  login,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

const { protect } = require("../middleware/authMiddleware");

router.get("/profile", protect, (req, res) => {

  res.json({
    message: "Protected Route Accessed Successfully",
    user: req.user,
  });

});

module.exports = router;