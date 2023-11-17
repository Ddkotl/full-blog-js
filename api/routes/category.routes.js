import { Router } from 'express'
import CreateController from '../controller/category/CreateController.js'
import DeleteController from '../controller/category/DeleteController.js'
import IndexController from '../controller/category/IndexController.js'
import ShowController from '../controller/category/ShowController.js'
import UpdateController from '../controller/category/UpdateController.js'
import { CreateRequest } from '../validations/category/CreateRequest.js'
import { UpdateRequest } from '../validations/category/UpdateRequest.js'
const categoryRouter = new Router()

categoryRouter.post('/category', CreateRequest, CreateController.create)
categoryRouter.get('/categories', IndexController.index)
categoryRouter.get('/category/:id', ShowController.show)
categoryRouter.put('/category', UpdateRequest, UpdateController.update)
categoryRouter.delete('/category/:id', DeleteController.delete)

export default categoryRouter
