import User from '../model/User.js'
import asyncHandler from 'express-async-handler'

export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  if (user) res.json({ user })
  return res.json({ message: 'User not found' }).statusCode(404)
})

export const getUserFriends = asyncHandler(async (req, res) => {
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

export const addRemoveFriends = asyncHandler(async (req, res) => {
  const { id, friendid } = req.params
  const user = await User.findById(id)
  const friend = await User.findById(friendid)

  if (user.friends.includes(friendid)) {
    //remove friend
    user.friends = user.friends.filter((id) => id !== friendid)
    friend.friends = friend.friends.filter((id) => id !== id)
  } else {
    // adding friend
    user.friends.push(friendid)
    friend.friends.push(id)
  }

  await user.save()
  await friend.save()

  const friends = await Promise.all(user.friends.map((id) => User.findById(id)))
  const formattedFriends = friends.map(
    ({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return { _id, firstName, lastName, occupation, location, picturePath }
    }
  )
  res.json({ formattedFriends })
})
