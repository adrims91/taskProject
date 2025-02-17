const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./api/router/authRoutes.js')

const app = express()
const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to mongoDB')
    }catch(error){
        console.error('Error connecting to mongoDB', error)
    }
}

connection();

  
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor iniciado en el puerto ${process.env.PORT}`)
})