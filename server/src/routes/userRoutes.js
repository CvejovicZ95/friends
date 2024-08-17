import express from 'express'
import { registerUser, loginUser, logoutUser, getAllUsersController, getUserByIdController } from '../controllers/userController.js'

export const userRouter = express.Router()

userRouter.get('/users', getAllUsersController)
userRouter.get('/user/:id', getUserByIdController)
userRouter.post('/registerUser', registerUser)
userRouter.post('/loginUser', loginUser)
userRouter.post('/logoutUser', logoutUser)