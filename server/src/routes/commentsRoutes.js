import express from 'express'
//import { authenticateToken } from '../middleware/authToken.js'
import { getAllCommentsInPostController, addCommentController, deleteCommentController, updateCommentController } from '../controllers/commentsController.js'

export const commentsRouter= express.Router()

commentsRouter.get('/comments/:id', getAllCommentsInPostController)
commentsRouter.post('/comments', addCommentController)
commentsRouter.delete('/comments/:id', deleteCommentController)
commentsRouter.put('/comments/:id', updateCommentController)