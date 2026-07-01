const pool = require("../config/db");

// Create a new user
const createUser = async (name, email, password, role = "user") => {
  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING user_id, name, email, role;
  `;

  const values = [name, email, password, role];
  const result = await pool.query(query, values);

  return result.rows[0];
};

// Find user by email
const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  return result.rows[0];
};

// Find user by ID
const findUserById = async (id) => {
  const result = await pool.query(
    "SELECT user_id, name, email, role FROM users WHERE user_id=$1",
    [id]
  );

  return result.rows[0];
};

const getAllUsers = async () => {

    const result = await pool.query(`
        SELECT
            user_id,
            name,
            email,
            role
        FROM users
        ORDER BY name
    `);

    return result.rows;

};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
};