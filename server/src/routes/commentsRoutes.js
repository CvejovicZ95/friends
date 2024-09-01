import express from 'express'
//import { authenticateToken } from '../middleware/authToken.js'
import { getAllCommentsInPostController, addCommentController } from '../controllers/commentsController.js'

export const commentsRouter= express.Router()

commentsRouter.get('/comments/:id', getAllCommentsInPostController)
commentsRouter.post('/comments', addCommentController)