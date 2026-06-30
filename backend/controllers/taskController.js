const {
  createTask,
  assignUser,
  getAllTasks,
  getTasksByUser,
  getAssignedUsers,
} = require("../models/taskModel");

const { addLog } = require("../models/activityModel");

const createNewTask = async (req, res) => {

  try {

    const {
      title,
      description,
      assignedUsers = [],
    } = req.body;

    // Logged-in user
    const creatorId = req.user.user_id;

    // Create task
    const task = await createTask(
      title,
      description,
      creatorId
    );

    // Assign creator
    await assignUser(
      task.task_id,
      creatorId
    );

    // Assign additional users
    for (const userId of assignedUsers) {

      if (userId !== creatorId) {
        await assignUser(
          task.task_id,
          userId
        );
      }

    }

    // Activity log
    await addLog(
      creatorId,
      task.task_id,
      "Task Created"
    );

    res.status(201).json({
      message: "Task Created Successfully",
      task,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

const getTasks = async (req, res) => {

  try {

    let tasks;

    if (req.user.role === "admin") {

      tasks = await getAllTasks();

    } else {

      tasks = await getTasksByUser(req.user.user_id);

    }

    // Attach assigned users to every task
    for (const task of tasks) {

      task.assignedUsers = await getAssignedUsers(task.task_id);

    }

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


module.exports = {
  createNewTask,
  getTasks,
};