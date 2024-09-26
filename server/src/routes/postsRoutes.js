import express from 'express'
import { authenticateToken } from '../middleware/authToken.js'
import { getAllPostsController, addPostController, updatePostController, deletePostController, getPostsByUserController, toggleLikeController } from '../controllers/postsController.js'

export const postsRouter = express.Router()

postsRouter.get('/posts', getAllPostsController)
postsRouter.get('/posts/user/:userId', getPostsByUserController)
postsRouter.post('/newPost', authenticateToken, addPostController)
postsRouter.put('/post/:id', authenticateToken, updatePostController)
postsRouter.put('/post/like/:id', authenticateToken, toggleLikeController)
postsRouter.delete('/post/:id', authenticateToken, deletePostController)
