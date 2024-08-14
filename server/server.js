import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'


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

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })