const express = require("express");
const router = express.Router();

const TaskController = require("../controller/TaskController")
const verifyToken = require("../middleware/verifyToken");

router.post("/create", verifyToken, TaskController.createTask);
router.delete("/delete/:taskId", verifyToken, TaskController.deleteTask);
router.get("/task-details/:taskId", TaskController.getTaskDetailsById);
router.put("/update/:taskId", TaskController.updateTaskDetailsById);
router.put("/update/category/:taskId", TaskController.updateCategoryById);
router.put("/update/assignee/:taskId", TaskController.updateAssignee);
router.get("/all",verifyToken, TaskController.getAllTasks);

module.exports = router;