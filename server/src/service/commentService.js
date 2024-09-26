import { Comment } from '../models/commentSchema.js'
import { Post } from '../models/postsSchema.js'
import { User } from '../models/userSchema.js'
import { logger } from '../../logger.js'

export const getCommentsByPostId = async (postId) => {
  try {
    const allCommentsInPost = await Comment.find({ post: postId })
      .populate('user', 'username profilePhotoImagePath')
    return allCommentsInPost
  } catch (error) {
    logger.error('Error fetching all comments', error.message)
    throw new Error('Error fetching all comments')
  }
}

export const addComment = async (userId, postId, text) => {
  try {
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    const post = await Post.findById(postId)
    if (!post) {
      throw new Error('Post not found')
    }

    const newComment = new Comment({
      user: user._id,
      post: postId,
      content: { text }
    })
    await newComment.save()

    post.actions.comments.count += 1
    post.actions.comments.commentIds.push(newComment._id)
    await post.save()

    logger.info('New comment added', { commentId: newComment._id, postId, userId })
    return newComment
  } catch (error) {
    logger.error('Error adding new comment', {
      message: error.message,
      stack: error.stack,
      userId,
      postId,
      text
    })
    throw new Error('Error adding new comment')
  }
}

export const deleteCommentById = async (commentId) => {
  try {
    const comment = await Comment.findById(commentId)
    if (!comment) {
      throw new Error('Comment not found')
    }

    const postId = comment.post

    await Comment.findByIdAndDelete(commentId)

    const post = await Post.findById(postId)
    if (!post) {
      throw new Error('Post not found')
    }

    post.actions.comments.count -= 1
    post.actions.comments.commentIds = post.actions.comments.commentIds.filter(id => !id.equals(commentId))
    await post.save()

    logger.info('Comment deleted and post updated')
    return { message: 'Comment deleted successfully' }
  } catch (error) {
    logger.error('Error deleting comment', {
      message: error.message,
      stack: error.stack
    })
    throw error
  }
}

export const updateCommentById = async (commentId, newText) => {
  try {
    const comment = await Comment.findById(commentId)
    if (!comment) {
      throw new Error('Comment not found')
    }

    comment.content.text = newText
    await comment.save()

    const postId = comment.post
    const post = await Post.findById(postId)
    if (!post) {
      throw new Error('Post not found')
    }

    logger.info('Comment updated and post updated')
    return { message: 'Comment updated successfully' }
  } catch (error) {
    logger.error('Error updating comment', error.message)
    throw new Error('Error updating comment')
  }
}
