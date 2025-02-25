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
  const { userId } = req.params;

  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  try {
    const tasks = await Task.find({ user: userId });
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

const completeTask = async (req, res) => {
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
  
    task.isDone = true
    await task.save();
    res.status(200).json({message: 'Tarea completada correctamente'})

  }catch(error) {
    return res.status(500).json({error: error.message})
  }


}

module.exports = { createTask, getTask, deleteTask, updateTask, getTasks, completeTask };
