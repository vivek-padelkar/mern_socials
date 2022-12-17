import jwt from 'jsonwebtoken'
import User from '../model/User.js'

export const verifyToken = async (req, res, next) => {
  try {
    let token = ''
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
      const decode = jwt.verify(token, process.env.SECRETKEY)
      req.user = User.findById(decode.id).select('-password')
      next()
    } else {
      console.log(error)
      res.status(401)
      throw new Error('Not authroized, token failed')
    }
  } catch (error) {
    res.status(401)
    throw new Error('invalid Token')
  }
}
