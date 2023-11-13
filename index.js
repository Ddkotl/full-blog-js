import express from 'express'
import postRouter from './routes/post.routes.js'
import userRouter from './routes/user.routes.js'

const PORT = process.env.PORT || 4444
const app = express()

app.use(express.json())

app.use('/api', userRouter)
app.use('/api', postRouter)

// app.post('/auth/login', (req, res) => {
// 	console.log(req.body)
// 	const token = jwt.sign(
// 		{
// 			email: req.body.email,
// 			name: req.body.name,
// 		},
// 		'jkkj875'
// 	)
// 	res.json({
// 		sucsess: true,
// 		token,
// 	})
// })

app.listen(PORT, err => {
	if (err) {
		return console.log(err)
	}
	console.log(`Server started on localhost:${PORT}`)
})