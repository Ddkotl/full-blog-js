import express from 'express'
import authRouter from './routes/auth.routes.js'
import categoryRouter from './routes/category.routes.js'
import postRouter from './routes/post.routes.js'
import tagRouter from './routes/tag.routes.js'
import userRouter from './routes/user.routes.js'

const PORT = process.env.PORT || 4444
const app = express()

app.use(express.json())

app.use('/api', userRouter)
app.use('/api', postRouter)
app.use('/api', categoryRouter)
app.use('/api', tagRouter)
app.use('/api', authRouter)

app.listen(PORT, err => {
	if (err) {
		return console.log(err)
	}
	console.log(`Server ok, it started on localhost:${PORT}`)
})
