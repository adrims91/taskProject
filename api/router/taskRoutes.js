const express = require('express')
const taskRouter = express.Router()
const { createTask, getTasks } = require('../controllers/taskControllers.js')

taskRouter.post('/tasks', createTask)
taskRouter.get('/tasks', getTasks)

module.exports = taskRouter;