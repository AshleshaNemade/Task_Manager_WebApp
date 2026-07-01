const pool = require("../config/db");

const addLog = async (userId, taskId, action) => {

  const query = `
      INSERT INTO activity_logs(user_id, task_id, action)
      VALUES($1,$2,$3)
  `;

  await pool.query(query, [
    userId,
    taskId,
    action
  ]);

};

// Get all activity logs
const getAllLogs = async () => {

  const query = `
      SELECT
          al.log_id,
          al.action,
          al.timestamp,
          u.name AS user_name,
          al.task_id
      FROM activity_logs al
      LEFT JOIN users u
      ON al.user_id = u.user_id
      ORDER BY al.timestamp DESC;
  `;

  const result = await pool.query(query);

  return result.rows;

};

module.exports = {
  addLog,
  getAllLogs
};