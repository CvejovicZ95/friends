import express from 'express'
import { registerUser, loginUser, logoutUser, getAllUsersController, getUserByIdController, getUserProfileWithPosts, getUnreadNotificationsCount } from '../controllers/userController.js'

export const userRouter = express.Router()

userRouter.get('/users', getAllUsersController)
userRouter.get('/user/:id', getUserByIdController)
userRouter.get('/userProfile/:username', getUserProfileWithPosts)
userRouter.get('/unread-notifications-count/:id', getUnreadNotificationsCount)
userRouter.post('/registerUser', registerUser)
userRouter.post('/loginUser', loginUser)
userRouter.post('/logoutUser', logoutUser)
