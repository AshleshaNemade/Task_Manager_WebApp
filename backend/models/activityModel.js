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

module.exports = {
  addLog,
};