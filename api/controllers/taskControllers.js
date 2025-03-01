const { startOfToday, endOfToday } = require('date-fns')
const Task = require("../models/taskModel.js");

const createTask = async (req, res) => {
  const { title, date } = req.body;
  const user = req.user;
  try {
  
    if (!title || !date) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    };
    if (!user) {
      return res.status(404).json({error: 'Usuario no encontrado'})
    }
    const existingTask = await Task.findOne({ title, user: user.id });
    if (existingTask) {
      return res
        .status(400)
        .json({ error: "Ya existe una tarea con ese nombre" });
    }
    const tasks = await Task.find()
    if (tasks.length === 10){
      return res.status(400).json({error: 'No puedes tener más de 10 tareas activas, elimina o completa alguna de las que ya tienes.'})
    }

    const newTask = new Task({
      title,
      user: user.id,
      isDone: false,
      date
    });
    await newTask.save();
    res.status(201).json({ message: "Tarea creada correctamente", "task": newTask });
  } catch (error) {
    res.status(500).json({ error: "error de servidor", details: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
  const user = req.user;
  const { id } = req.params;
  const {title, description} = req.body
  
    const existingTask = await Task.findById(id)
    if (!existingTask || existingTask.user != user.id) {
      return res.status(404).json({ error: 'Tarea no encontrada o la tarea no es tuya' })
    }
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
  const user = req.user;
  try {
    const existingTask = await Task.findById(id);
    if (existingTask && existingTask.user == user.id) {
      await existingTask.deleteOne()
      res.status(200).json({ message: 'Tarea eliminada' });
    }else {
      res.status(403).json({error: 'Tarea no encontrada o la tarea no es tuya'})
    }
  } catch (error) {
    res.status(500).json({ error: 'error del servidor', details: error.message });
  }
}

const getTasks = async (req, res) => {
  const user = req.user;

  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  try {
    const tasks = await Task.find({ user: user.id, isDone: false });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: 'Error de servidor', details: error.message });
  }
};

const getTask = async (req, res) => {

  const {id} = req.params
  try {
    const task = await Task.findById(id);
    if (!task){
      return res.status(404).json({error: 'Tarea no encontrada'})
    }
    res.status(200).json({ task });

  } catch (error) {
    res.status(500).json({error: 'Error de servidor', details: error})
  }
};

const getCompletedTasks = async (req, res) => {
  try {
    const user = req.user
    if (!user) {
      return res.status(400).json({ error: 'Usuario no autenticado.' });
    }

    const tasks = await Task.find({ user: user.id, isDone: true });

    if (tasks.length === 0) {
      return res.status(404).json({ error: 'No tienes tareas completadas.' });
    }

    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor.', details: error.message });
  }
};

const getTodayTasks = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({ error: 'Usuario no válido' });
  }

  try {
    const startOfTodayDate = startOfToday();
    const endOfTodayDate = endOfToday();

    const todayTasks = await Task.find({
      user: user.id,
      date: { 
        $gte: startOfTodayDate,
        $lte: endOfTodayDate,
      },
    });

    res.status(200).json({ tasks: todayTasks });
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
};

const getCaducatedTasks = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({ error: 'Usuario no válido' });
  }

  try {
    const startOfTodayDate = startOfToday();

    const caducatedTasks = await Task.find({
      user: user.id,
      date: { 
        $lte: startOfTodayDate,
      },
    });
    if (caducatedTasks.length === 0){
      return res.status(400).json({error: 'No tienes tareas caducadas'})
    }

    res.status(200).json({ tasks: caducatedTasks });
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
};




const changeTaskStatus = async (req, res) => {
  const {id} = req.params;
  const user = req.user;
  try {
    
    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).json({error: 'Tarea no encontrada o no te pertenece'})
    }
    if (task.user != user.id) {
      return res.status(401).json({error: "Esa tarea no es tuya"})
    }
  
    task.isDone = !task.isDone
    await task.save();
    res.status(200).json({message: 'Tarea actualizada correctamente'})

  }catch(error) {
    return res.status(500).json({error: error.message})
  }


}

module.exports = { createTask, getTask, deleteTask, updateTask, getTasks, changeTaskStatus, getCompletedTasks, getTodayTasks, getCaducatedTasks };
