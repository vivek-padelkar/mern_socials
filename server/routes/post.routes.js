import express from 'express'
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from '../controller/post.controller.js'
import { verifyToken } from '../middleware/verifyToken.js'
const router = express.Router()

router.get('/', verifyToken, getFeedPosts)
router.get('/:userid/posts', verifyToken, getUserPosts)

router.patch('/:id/like', verifyToken, likePost)

export default router
