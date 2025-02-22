const { Temporal } = require("@js-temporal/polyfill");
const Task = require("../models/taskModel.js");
const User = require('../models/userModel.js');

const createTask = async (req, res) => {
  const { userId, title, description, date } = req.body;
  
  try {
  if (!title || !userId || !description || !date) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }
  const existingTask = await Task.findOne({ title, user: userId });
  if (existingTask) {
    return res
      .status(400)
      .json({ error: "Ya existe una tarea con ese nombre" });
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
      date
    });
    await newTask.save();
    res.status(201).json({ message: "Tarea creada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "error de servidor", details: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
  const { user } = req;
  const { id } = req.params;
  const {title, description} = req.body
  
    const existingTask = await Task.findById(id)
    // if (!existingTask || existingTask.user != user.id) {
    //   return res.status(404).json({ error: 'Tarea no encontrada o la tarea no es tuya' })
    // }
    if (title) existingTask.title = title
    if (description) existingTask.description = description

    await existingTask.save();

    res.status(200).json({message: 'Tarea actualizada correctamente'})

  } catch (error) {
    res.status(500).json({ error: 'Error de servidor', details: error.message });

  }
}

const deleteTask = async (req, res) => {
  const {id} = req.params
  const { user } = req;
  try {
    const existingTask = await Task.findById(id);
    if (existingTask && existingTask.user == user.id) {
      await existingTask.remove();
      res.status(200).json({ message: 'Tarea eliminada' });
    }else {
      res.status(403).json({error: 'Tarea no encontrada o la tarea no es tuya'})
    }
  } catch (error) {
    res.status(500).json({ error: 'error del servidor' });
  }
}

const getTasks = async (req, res) => {
  const {user} = req;
  const {userId} = req.params

  if (!user) return res.status(404).json({error: 'Usuario no encontrado'})
  if (user._id != userId) return res.status(401).json({error: 'Esta tarea no te pertenece'})

  const tasks = Task.findById({user: userId})
  
  res.status(200).json({tasks})

}

const getTask = async (req, res) => {

  const {id} = req.params
  try {
    const task = await Task.findById(id);
    if (!task){
      return res.status(404).json({error: 'Tarea no encontrada'})
    }
    res.status(200).json({ task });

  }catch(error) {
    res.status(500).json({error: 'Error de servidor', details: error})
  }
};

module.exports = { createTask, getTask, deleteTask, updateTask, getTasks };
