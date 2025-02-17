const express = require('express')
const authRouter = express.Router()
const {register, login} = require('../controllers/authControllers.js')

authRouter.post('/register', register)
authRouter.post('/login', login)

module.exports = authRouter;