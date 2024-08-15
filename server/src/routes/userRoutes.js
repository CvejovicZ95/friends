import express from 'express'
import { registerUser, loginUser, logoutUser } from '../controllers/userController.js'

export const userRouter = express.Router()

userRouter.post('/registerUser', registerUser)
userRouter.post('/loginUser', loginUser)
userRouter.post('/logoutUser', logoutUser)