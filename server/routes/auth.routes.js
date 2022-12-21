import express from 'express'
const router = express.Router()
import { login } from '../controller/auth.controller.js'

router.route('/login').post(login)

export default router
