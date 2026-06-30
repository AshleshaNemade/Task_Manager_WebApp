const jwt = require("jsonwebtoken");
const { findUserById } = require("../models/userModel");

const protect = async (req, res, next) => {
  try {

    let token;

    // Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from DB
      const user = await findUserById(decoded.id);

      if (!user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      req.user = user;

      next();

    } else {

      return res.status(401).json({
        message: "No token provided",
      });

    }

  } catch (error) {

    return res.status(401).json({
      message: "Invalid Token",
    });

  }
};

module.exports = {
  protect,
};