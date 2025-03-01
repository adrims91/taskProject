const express = require('express')
const taskRouter = express.Router()
const { createTask, getTask, deleteTask, updateTask, getTasks, changeTaskStatus, getCompletedTasks, getTodayTasks, getCaducatedTasks } = require('../controllers/taskControllers.js')
const authToken = require('../middleware/authToken.js')

taskRouter.get('/tasks', authToken, getTasks)
taskRouter.get('/tasks/:id', getTask)
taskRouter.get('/completedTasks', authToken, getCompletedTasks)
taskRouter.get('/todayTasks', authToken, getTodayTasks)
taskRouter.get('/caducatedTasks', authToken, getCaducatedTasks)
taskRouter.post('/tasks', authToken, createTask)
taskRouter.put('/tasks/:id', updateTask)
taskRouter.put('/doneTask/:id', authToken, changeTaskStatus)
taskRouter.delete('/tasks/:id', authToken, deleteTask)

module.exports = taskRouter;