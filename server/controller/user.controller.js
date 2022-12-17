import User from '../model/User'
import asyncHandler from 'express-async-handler'

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  if (user) res.json({ user })
  return res.json({ message: 'User not found' }).statusCode(404)
})

const getUserFriends = asyncHandler(async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)

  const friends = await Promise.all(user.friends.map((id) => User.findById(id)))
  const formattedFriends = friends.map(
    ({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, occupation, location, picturePath }
    }
  )
  res.json({ formattedFriends })
})

const addRemoveFriends = asyncHandler(async (req, res) => {
    
})

exports = {
  getUser,
  getUserFriends,
  addRemoveFriends,
}
