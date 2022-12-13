import jwt from 'jsonwebtoken'

export const generateToken = (id) => {
  return jwt.sign(id, process.env.SECRETKEY, {
    expiresIn: '30d', // will expire in 30 days
  })
}
