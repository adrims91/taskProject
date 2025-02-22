const express = require('express')
const taskRouter = express.Router()
const { createTask, getTask, deleteTask, updateTask, getTasks } = require('../controllers/taskControllers.js')
const authToken = require('../middleware/authToken.js')

taskRouter.get('/tasks/:userId', authToken, getTasks)
taskRouter.get('/tasks/:id', getTask)
taskRouter.post('/tasks', authToken, createTask)
taskRouter.put('/tasks/:id', updateTask)
taskRouter.delete('/tasks/:id', deleteTask)

module.exports = taskRouter;