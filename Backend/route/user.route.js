import express from 'express'
import { signup, login } from '../controller/user.controller.js'
const router = express.Router()

router.post('/signup', signup) //route user/signup
router.post('/login', login) //route user/login

export default router
