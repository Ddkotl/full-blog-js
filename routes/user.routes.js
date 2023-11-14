import { Router } from 'express'
import userController from '../controller/user/user.controller.js'
import { registerValidator } from '../validations/auth.js'
const userRouter = new Router()

userRouter.post('/user', registerValidator, userController.create)
userRouter.get('/users', userController.index)
userRouter.get('/user/:id', userController.show)
userRouter.put('/user', userController.update)
userRouter.delete('/user/:id', userController.delete)

export default userRouter
