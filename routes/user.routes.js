import { Router } from 'express'
import userController from '../controller/user.controller.js'
const userRouter = new Router()

userRouter.post('/user', userController.create)
userRouter.get('/users', userController.index)
userRouter.get('/user/:id', userController.show)
userRouter.put('/user', userController.update)
userRouter.delete('/user/:id', userController.delete)

export default userRouter
