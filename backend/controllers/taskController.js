const {
    createTask,
    assignUser,
    getAllTasks,
    getTasksByUser,
    getAssignedUsers,
    getTaskById,
    updateTask,
    deleteAssignments,
    isAssignedUser,
    deleteTask
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

const editTask = async (req, res) => {

  try {

    const taskId = req.params.id;

    const {
      title,
      description,
      status,
      assignedUsers = []
    } = req.body;

    const task = await getTaskById(taskId);

    if (!task) {

      return res.status(404).json({
        message: "Task not found"
      });

    }

    // Permission Check
    if (req.user.role !== "admin") {

      const assigned = await isAssignedUser(
        taskId,
        req.user.user_id
      );

      if (!assigned) {

        return res.status(403).json({
          message: "Access Denied"
        });

      }

    }

    // Update task
    const updatedTask = await updateTask(
      taskId,
      title,
      description,
      status
    );

    // Update assignments
    await deleteAssignments(taskId);

    // Creator is always assigned
    await assignUser(
      taskId,
      task.created_by
    );

    // Assign selected users
    for (const userId of assignedUsers) {

      if (userId !== task.created_by) {

        await assignUser(
          taskId,
          userId
        );

      }

    }

    // Activity log
    await addLog(
      req.user.user_id,
      taskId,
      "Task Updated"
    );

    res.json({
      message: "Task Updated Successfully",
      task: updatedTask
    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const removeTask = async (req, res) => {

    try {

        const taskId = req.params.id;

        const task = await getTaskById(taskId);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        // Log deletion BEFORE deleting the task
        await addLog(
            req.user.user_id,
            taskId,
            `Task "${task.title}" Deleted`
        );

        // Delete task
        await deleteTask(taskId);

        res.json({
            message: "Task Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
  createNewTask,
  getTasks,
  editTask,
  removeTask
};