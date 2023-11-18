import cors from 'cors'
import express from 'express'
import multer from 'multer'
import authRouter from './routes/auth.routes.js'
import categoryRouter from './routes/category.routes.js'
import postRouter from './routes/post.routes.js'
import tagRouter from './routes/tag.routes.js'
import userRouter from './routes/user.routes.js'
import checkAuth from './utils/checkAuth.js'

const PORT = process.env.PORT || 4444
const app = express()

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage })

app.post(
	'/api/upload',
	checkAuth,
	upload.single('image', (req, res) => {
		res.json({
			url: `/uploads/${req.file.originalname}`,
		})
	})
)

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

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
