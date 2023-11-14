import { Router } from 'express'
import CreateController from '../controller/user/CreateController.js'
import DeleteController from '../controller/user/DeleteController.js'
import IndexController from '../controller/user/IndexController.js'
import ShowController from '../controller/user/ShowController.js'
import UpdateController from '../controller/user/UpdateController.js'
import { CreateRequest } from '../validations/user/CreateRequest.js'
import { UpdateRequest } from '../validations/user/UpdateRequest.js'
const userRouter = new Router()

userRouter.post('/user', CreateRequest, CreateController.create)
userRouter.get('/users', IndexController.index)
userRouter.get('/user/:id', ShowController.show)
userRouter.put('/user', UpdateRequest, UpdateController.update)
userRouter.delete('/user/:id', DeleteController.delete)

export default userRouter
