import { Router } from 'express'
import CreateController from '../controller/post/CreateController.js'
import postController from '../controller/post/post.controller.js'
import { CreateRequest } from '../validations/post/CreateRequest.js'
const postRouter = new Router()

postRouter.post('/post', CreateRequest, CreateController.create)
postRouter.get('/posts', postController.index)
postRouter.get('/post/:id', postController.show)
postRouter.put('/post', postController.update)
postRouter.delete('/post/:id', postController.delete)

postRouter.get('/post', postController.getPostsByUser)

export default postRouter
