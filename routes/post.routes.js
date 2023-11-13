import { Router } from 'express'
import postController from '../controller/post.controller.js'
const postRouter = new Router()

postRouter.post('/post', postController.create)
postRouter.get('/posts', postController.index)
postRouter.get('/post/:id', postController.show)
postRouter.put('/post', postController.update)
postRouter.delete('/post/:id', postController.delete)

export default postRouter
