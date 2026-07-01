const {
  getAllLogs,
} = require("../models/activityModel");

const getActivityLogs = async (req, res) => {

  try {

    const logs = await getAllLogs();

    res.json(logs);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getActivityLogs,
};