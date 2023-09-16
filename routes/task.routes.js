const express = require("express");

const {
  seedTasksDatabase,
  readAllTasks,
  addNewTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const taskRouter = express.Router();

// READ ALL TASKS:

taskRouter.get("/", async (req, res) => {
  try {
    const tasks = await readAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all tasks", error });
  }
});

// ADD TASK:

taskRouter.post("/", async (req, res) => {
  try {
    const task = await addNewTask(req.body);
    if (task) {
      res.status(201).json({ message: "New Task Added: ", task });
    } else {
      res.status(404).json({ error: "Request Body not provided" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to add new task", error });
  }
});

// UPDATE TASK:

taskRouter.post("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const updatedTask = await updateTask(taskId, req.body);
    if (updatedTask) {
      res.status(200).json({ message: "Task Updated: ", updatedTask });
    } else {
      res.status(404).json({ error: "Failed to update task" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error });
  }
});

// DELETE TASK:

taskRouter.delete("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await deleteTask(taskId);
    if (deletedTask) {
      res.status(200).json({ message: "Task Deleted: ", deletedTask });
    } else {
      res.status(404).json({ error: "Failed to delete task" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error });
  }
});

module.exports = taskRouter;
