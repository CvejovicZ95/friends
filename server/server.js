import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

import { connect } from './src/db/connectDB.js'

import { errorHandler } from './src/middleware/errorMiddleware.js'

import { userRouter } from './src/routes/userRoutes.js'
import { tokenRouter } from './src/routes/tokenRoutes.js'


const app=express()
dotenv.config()

const PORT = process.env.PORT || 5000

const corsOptions = {
    origin: ['http://localhost:3000', 'http://192.168.1.8:3000'],
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.use(errorHandler);

app.use('/api', userRouter)
app.use('/api', tokenRouter)

app.listen(PORT, () => {
    connect()
    console.log(`Server is listening on port ${PORT}`)
  })