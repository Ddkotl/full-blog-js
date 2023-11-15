import { Router } from 'express'
import CreateController from '../controller/tag/CreateController.js'
import DeleteController from '../controller/tag/DeleteController.js'
import IndexController from '../controller/tag/IndexController.js'
import ShowController from '../controller/tag/ShowController.js'
import UpdateController from '../controller/tag/UpdateController.js'
import { CreateRequest } from '../validations/tag/CreateRequest.js'
import { UpdateRequest } from '../validations/tag/UpdateRequest.js'
const tagRouter = new Router()

tagRouter.post('/tag', CreateRequest, CreateController.create)
tagRouter.get('/tags', IndexController.index)
tagRouter.get('/tag/:id', ShowController.show)
tagRouter.put('/tag', UpdateRequest, UpdateController.update)
tagRouter.delete('/tag/:id', DeleteController.delete)

export default tagRouter
