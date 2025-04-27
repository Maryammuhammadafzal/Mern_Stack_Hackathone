
import Task from "../models/Task.js";
import User from "../models/User.js";

export const createTask = async (req, res) => {
  const { title, description, assignedTo } = req.body;
  console.log(req.body);

  // Find user by name
  const user = await User.findOne({ username: req.body.assignedTo });
  console.log(user);
  console.log(user._id);
  

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    assignedTo: user._id,  
    status: req.body.status
  });
  await task.save();
  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find().populate("assignedTo", "username");
  res.status(200).json(tasks);
};

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(task);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Task deleted" });
};
