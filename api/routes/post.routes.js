import { Router } from 'express'
import CreateController from '../controller/post/CreateController.js'
import DeleteController from '../controller/post/DeleteController.js'
import IndexController from '../controller/post/IndexController.js'
import ShowController from '../controller/post/ShowController.js'
import UpdateController from '../controller/post/UpdateController.js'
import postController from '../controller/post/post.controller.js'
import checkAuth from '../utils/checkAuth.js'
import handleValidationErrors from '../utils/handleValidationErrors.js'
import { CreateRequest } from '../validations/post/CreateRequest.js'
import { UpdateRequest } from '../validations/post/UpdateRequest.js'
const postRouter = new Router()

postRouter.post(
	'/post',
	CreateRequest,
	handleValidationErrors,
	checkAuth,
	CreateController.create
)
postRouter.get('/posts', IndexController.index)
postRouter.get('/post/:id', ShowController.show)
postRouter.put(
	'/post',
	UpdateRequest,
	handleValidationErrors,
	checkAuth,
	UpdateController.update
)
postRouter.delete('/post/:id', checkAuth, DeleteController.delete)

postRouter.get('/post', postController.getPostsByUser)

export default postRouter
