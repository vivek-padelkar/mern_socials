import Post from '../model/Post.js'
import User from '../model/User.js'
import asynchandller from 'express-async-handler'

export const createPost = asynchandller(async (req, res) => {
  const { userId, description, picturePath } = req.body
  const user = await User.findById(userId)
  const newPost = new Post({
    userId,
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    description,
    userPicturePath: user.picturePath,
    picturePath,
    likes: {},
    comments: {},
  })
  await newPost.save()
  const post = await Post.find() //return all the post
  res.json(post)
})

export const getFeedPosts = asynchandller(async (req, res) => {
  const post = await Post.find()
  res.json(post)
})

export const getUserPosts = asynchandller(async (req, res) => {
  const { userId } = req.params
  const post = await Post.find()
  res.json(post)
})

export const likePost = asynchandller(async (req, res) => {
  const { id } = req.params
  const { userId } = req.body
  const post = await Post.findById(id)
  const isLiked = post.likes.get(userId)

  if (isLiked) {
    post.likes.delete(userId) //deleting like
  } else {
    post.likes.set(userId, true) //liking the post
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { like: post.likes },
    { new: true }
  )
  res.json(updatedPost)
})
