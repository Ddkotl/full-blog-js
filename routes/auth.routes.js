import { Router } from 'express'
import LoginController from '../controller/auth/LoginController.js'
import MeController from '../controller/auth/MeController.js'
import RegisterController from '../controller/auth/RegisterController.js'
import checkAuth from '../utils/checkAuth.js'
import { LoginRequest } from '../validations/auth/LoginRequest.js'
import { RegisterRequest } from '../validations/auth/RegisterRequest.js'
const authRouter = new Router()

authRouter.post('/register', RegisterRequest, RegisterController.register)
authRouter.post('/login', LoginRequest, LoginController.login)
authRouter.get('/me', checkAuth, MeController.getInfoAboutMe)

export default authRouter
