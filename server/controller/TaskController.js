const Task = require("../models/Task");
const mongoose=require("mongoose")

const createTask= async (req, res, next) => {
    try {
        const {
            title,
            priority,
            category,
            dueDate,
            assignedTo,
            checklistItems,
        } = req.body;

        if (
            !title ||
            !priority ||
            !category ||
            !checklistItems
        ) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const userId = req.userId;
        const taskDetails = new Task({
  title,
  priority,
  category,
  dueDate,
  assignedTo,
  checklistItems,
 refUserId: userId,
        });

        const savedTask = await taskDetails.save();
        res.json({ taskId: savedTask._id ,message: "Task created successfully" });
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const taskId = req.params.taskId;

        const taskDetails = await Task.findByIdAndDelete(taskId);

        if (!taskDetails) {
            return res.status(400).json({
                errorMessage: "data not found",
            });
        }

       res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        next(error);
    }
};

const getTaskDetailsById = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;

    const taskDetails = await Task.findById(taskId);

    if (!taskDetails) {
      return res.status(400).json({
        errorMessage: "Bad request",
      });
    }

    res.json({ data: taskDetails });
  } catch (error) {
    next(error);
  }
};

const getAssignedTask = async (req, res, next) => {
  try {
    const email = req.params.email;

    const taskDetails = await Task.find({ assignedTo: email });

    if (!taskDetails) {
      return res.status(400).json({
        errorMessage: "Bad request",
      });
    }

    res.json({ data: taskDetails });
  } catch (error) {
    next(error);
  }
};
const updateAssignee = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;

    if (!taskId) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    const isTaskExists = await Task.findOne({ _id: taskId });
    if (!isTaskExists) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    const { assignedTo } = req.body;

    await Task.updateOne(
      { _id: taskId },
      {
        $set: {
          assignedTo,
        },
      }
    );
    res.json({ message: "Assignee updated successfully" });
  } catch (error) {
    next(error);
  }
};

const updateTaskDetailsById = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;

    if (!taskId) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    const isTaskExists = await Task.findOne({ _id: taskId });

    if (!isTaskExists) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    const { title, priority, category, dueDate, assignedTo, checklistItems } =
      req.body;

    if (!title || !priority || !category || !checklistItems) {
      return res.status(400).json({
        errorMessage: "Bad request",
      });
    }

    await Task.updateOne(
      { _id: taskId },
      {
        $set: {
          title,
          priority,
          category,
          dueDate,
          assignedTo,
          checklistItems,
        },
      }
    );

    res.json({ message: "Task updated successfully" });
  } catch (error) {
    next(error);
  }
};

const updateCategoryById = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;

    if (!taskId) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    const isTaskExists = await Task.findOne({ _id: taskId });

    if (!isTaskExists) {
      return res.status(400).json({
        errorMessage: "Bad Request",
      });
    }

    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        errorMessage: "Bad request",
      });
    }

    await Task.updateOne(
      { _id: taskId },
      {
        $set: {
          category,
        },
      }
    );

    res.json({ message: "Task category updated successfully" });
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  const userId = req.userId;
  try {
    const taskList = await Task.find({ refUserId: userId });
    res.json({ data: taskList });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  deleteTask,
  getTaskDetailsById,
  getAssignedTask,
  updateAssignee,
  updateTaskDetailsById,
  updateCategoryById,
  getAllTasks,
};