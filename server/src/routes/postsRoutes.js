import express from 'express'
import { authenticateToken } from '../middleware/authToken.js'
import { getAllPostsController, addPostController, updatePostController, deletePostController } from '../controllers/postsController.js'

export const postsRouter = express.Router()

postsRouter.get('/posts', getAllPostsController )
postsRouter.post('/newPost', addPostController)
postsRouter.put('/post/:id',  updatePostController)
postsRouter.delete('/post/:id', authenticateToken, deletePostController)