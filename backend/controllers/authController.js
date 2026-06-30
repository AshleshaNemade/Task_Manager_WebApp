const bcrypt = require("bcrypt");
const {
  createUser,
  findUserByEmail,
} = require("../models/userModel");

const generateToken = require("../utils/generateToken");

// Register User
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(
      name,
      email,
      hashedPassword,
      role
    );

    res.status(201).json({
      message: "User Registered",
      user,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Login User
const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  register,
  login,
};