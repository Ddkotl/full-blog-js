import { Router } from 'express'
import LoginController from '../controller/auth/LoginController.js'
import MeController from '../controller/auth/MeController.js'
import RegisterController from '../controller/auth/RegisterController.js'
import checkAuth from '../utils/checkAuth.js'
import { registerValidator } from '../validations/auth.js'
const authRouter = new Router()

authRouter.post('/register', registerValidator, RegisterController.register)
authRouter.post('/login', LoginController.login)
authRouter.get('/me', checkAuth, MeController.getInfoAboutMe)

export default authRouter
