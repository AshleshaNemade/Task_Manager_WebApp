const pool = require("../config/db");

// Create Task
const createTask = async (title, description, createdBy) => {
  const query = `
    INSERT INTO tasks (title, description, created_by)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [title, description, createdBy];

  const result = await pool.query(query, values);

  return result.rows[0];
};

// Assign User to Task
const assignUser = async (taskId, userId) => {
  const query = `
    INSERT INTO task_assignments(task_id, user_id)
    VALUES($1, $2);
  `;

  await pool.query(query, [taskId, userId]);
};

// Get Task By ID
const getTaskById = async (taskId) => {

  const result = await pool.query(
    "SELECT * FROM tasks WHERE task_id=$1",
    [taskId]
  );

  return result.rows[0];
};


// Get all tasks
const getAllTasks = async () => {

  const query = `
    SELECT
      t.task_id,
      t.title,
      t.description,
      t.status,
      t.created_by,
      u.name AS creator_name
    FROM tasks t
    JOIN users u
      ON t.created_by = u.user_id
    ORDER BY t.task_id DESC;
  `;

  const result = await pool.query(query);

  return result.rows;
};

const getTasksByUser = async (userId) => {

  const query = `
      SELECT
          t.task_id,
          t.title,
          t.description,
          t.status,
          t.created_by,
          u.name AS creator_name
      FROM tasks t
      JOIN task_assignments ta
          ON t.task_id = ta.task_id
      JOIN users u
          ON t.created_by = u.user_id
      WHERE ta.user_id = $1
      ORDER BY t.task_id DESC;
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
};

const getAssignedUsers = async (taskId) => {

  const query = `
      SELECT
          u.user_id,
          u.name,
          u.email
      FROM users u
      JOIN task_assignments ta
      ON u.user_id = ta.user_id
      WHERE ta.task_id=$1;
  `;

  const result = await pool.query(query, [taskId]);

  return result.rows;

};

// Update task details
const updateTask = async (
  taskId,
  title,
  description,
  status
) => {

  const query = `
      UPDATE tasks
      SET
          title=$1,
          description=$2,
          status=$3
      WHERE task_id=$4
      RETURNING *;
  `;

  const result = await pool.query(query, [
    title,
    description,
    status,
    taskId
  ]);

  return result.rows[0];

};

const deleteAssignments = async (taskId) => {

  await pool.query(
    "DELETE FROM task_assignments WHERE task_id=$1",
    [taskId]
  );

};

const isAssignedUser = async (
  taskId,
  userId
) => {

  const result = await pool.query(
    `
    SELECT *
    FROM task_assignments
    WHERE task_id=$1
    AND user_id=$2
    `,
    [taskId, userId]
  );

  return result.rows.length > 0;

};

// Delete task
const deleteTask = async (taskId) => {

    const result = await pool.query(
        `
        DELETE FROM tasks
        WHERE task_id=$1
        RETURNING *;
        `,
        [taskId]
    );

    return result.rows[0];

};

module.exports = {
    createTask,
    assignUser,
    getTaskById,
    getAllTasks,
    getTasksByUser,
    getAssignedUsers,
    updateTask,
    deleteAssignments,
    isAssignedUser,
    deleteTask
};