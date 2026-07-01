const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getUsers,
} = require("../controllers/authController");

const validate = require("../middleware/errorMiddleware");

const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidator");

router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);

const { protect } = require("../middleware/authMiddleware");

router.get("/profile", protect, (req, res) => {

  res.json({
    message: "Protected Route Accessed Successfully",
    user: req.user,
  });

});

const authorizeRoles = require("../middleware/roleMiddleware");

router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {

    res.json({
      message: "Welcome Admin"
    });

  }
);

router.get(
    "/users",
    protect,
    getUsers
);

module.exports = router;