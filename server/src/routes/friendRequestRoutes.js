import express from 'express'
import {
  createFriendRequestController,
  getFriendRequestsByUserIdController,
  manageFriendRequestController
} from '../controllers/friendRequestController.js'

export const friendRequestRouter = express.Router()

friendRequestRouter.post('/send-friend-request', createFriendRequestController)
friendRequestRouter.get('/friend-requests/:userId', getFriendRequestsByUserIdController)
friendRequestRouter.post('/manage-friend-request', manageFriendRequestController)
