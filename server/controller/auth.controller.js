import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../model/User.js'
import asyncHandler from 'express-async-handler'
import { generateToken } from '../utils/genToken.js'

export const register = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastname,
    email,
    password,
    friends,
    location,
    occupation,
  } = req.body

  const salt = await bcrypt.genSalt()
  const passwordHash = await bcrypt.hash(password, salt)

  const newUser = new User({
    firstName,
    lastname,
    email,
    password: passwordHash,
    friends,
    location,
    occupation,
    viewedProfile: Math.floor(Math.random() * 10000),
    impression: Math.floor(Math.random() * 10000),
  })

  const savedUser = await newUser.save()
  register.json({
    message: 'User created,sucessfully',
    savedUser,
  })
})

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) res.json({ message: 'Username or password is incorrect' })
  const isMatch = bcrypt.compare(password, user.password)
  if (!isMatch)
    return res.json({ message: 'Username or password is incorrect' })
  const token = generateToken(user._id)
  delete user.password
  res.json({ message: 'Login successfully !', user, token })
}
