const { body } = require("express-validator");

const taskValidation = [

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("status")
    .optional()
    .isIn([
      "Pending",
      "In Progress",
      "Completed"
    ])
    .withMessage(
      "Status must be Pending, In Progress or Completed"
    ),

];

module.exports = {
  taskValidation,
};