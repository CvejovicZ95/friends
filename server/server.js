import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

import { connect } from './src/db/connectDB.js'

import { userRouter } from './src/routes/userRoutes.js'
import { tokenRouter } from './src/routes/tokenRoutes.js'
import { postsRouter } from './src/routes/postsRoutes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


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

app.use('/images', express.static(path.join(__dirname, '../server/images')))

app.use('/api', userRouter)
app.use('/api', tokenRouter)
app.use('/api', postsRouter)

app.listen(PORT, () => {
    connect()
    console.log(`Server is listening on port ${PORT}`)
  })