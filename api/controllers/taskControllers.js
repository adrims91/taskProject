const Task = require("../models/taskModel.js");
const User = require('../models/userModel.js');
const mongoose = require('mongoose')

const createTask = async (req, res) => {
  const { userId, title, description } = req.body;

  
  try {
  if (!title || !userId || !description) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const existingTask = await Task.findOne({ title, user: userId });

  if (existingTask) {
    return res
      .status(400)
      .json({ error: "Ya existe una tarea con ese nombre" });
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "ID de usuario no válido" });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({error: 'Usuario no encontrado'})
  }
  
    const newTask = new Task({
      title,
      description,
      user: user._id,
      isDone: false,
    });
    await newTask.save();
    res.status(201).json({ message: "Tarea creada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "error de servidor", details: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (!tasks){
      return res.status(404).json({error: 'Este usuario no tiene tareas'})
    }
    res.json({ tasks: tasks });

  }catch(error) {
    res.status(500).json({error: 'Error de servidor', details: error})
  }
};

module.exports = { createTask, getTasks };
