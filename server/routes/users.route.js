import express from 'express'
import {
  getUser,
  getUserFriends,
  addRemoveFriends,
} from '../controller/user.controller.js'
import { verifyToken } from '../middleware/verifyToken.js'
const router = express.Router()

//READ
router.route('/:id').get(verifyToken, getUser)
//GET USER FRIENDS
router.route('/:id/friends').get(verifyToken, getUserFriends)
//UPDATE
router.route('/:id/:friendid').patch(verifyToken, addRemoveFriends)

export default router
