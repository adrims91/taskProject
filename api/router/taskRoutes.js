const express = require('express')
const taskRouter = express.Router()
const { createTask, getTask, deleteTask, updateTask, getTasks, completeTask } = require('../controllers/taskControllers.js')
const authToken = require('../middleware/authToken.js')

taskRouter.get('/tasks/:userId', authToken, getTasks)
taskRouter.get('/tasks/:id', getTask)
taskRouter.post('/tasks', authToken, createTask)
taskRouter.put('/tasks/:id', updateTask)
taskRouter.put('/doneTask/:id', authToken, completeTask)
taskRouter.delete('/tasks/:id', authToken, deleteTask)

module.exports = taskRouter;