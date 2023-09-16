const mongoose = require("mongoose");
const fs = require("fs");

const Task = require("../models/task.model");
const jsonData = fs.readFileSync("./data/task.json");
const tasks = JSON.parse(jsonData);

// Seed Database:

async function seedTasksDatabase() {
  try {
    for (const task of tasks) {
      const {
        name,
        assignee,
        summary,
        effortSpent,
        endDate,
        startDate,
        priority,
        status,
        taskType,
      } = task;
      const newTask = new Task({
        name,
        assignee,
        summary,
        effortSpent,
        endDate,
        startDate,
        priority,
        status,
        taskType,
      });
      await newTask.save();
      console.log(`Task Name: ${name}`);
    }
  } catch (error) {
    console.error("Error seeding database", error);
  }
}

// Read All the tasks:

async function readAllTasks() {
  try {
    const tasks = await Task.find({});
    console.log("All tasks: ", tasks);
    return tasks;
  } catch (error) {
    console.error("Error while reading tasks", error);
  }
}

// Add New Task:

async function addNewTask(task) {
  try {
    const newTask = new Task(task);
    const savedTask = await newTask.save();
    console.log(newTask);
    return savedTask;
  } catch (error) {
    console.error("Error while creating a task", error);
  }
}

// Update Task:

async function updateTask(taskId, update) {
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, update, {
      new: true,
    });
    if (updatedTask) {
      console.log("Succesfully Updated" + updatedTask);
      return updatedTask;
    } else {
      console.log("Failed to Update");
    }
  } catch (error) {
    console.error("Error while updating a task", error);
  }
}

// Delete Task:

async function deleteTask(taskId) {
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (deletedTask) {
      console.log("Task Deleted: " + deletedTask);
      return deletedTask;
    } else {
      console.log("Task to be deleted not found");
    }
  } catch (error) {
    console.log("Error while deleting a task", error);
  }
}

module.exports = {
  seedTasksDatabase,
  readAllTasks,
  addNewTask,
  updateTask,
  deleteTask,
};
