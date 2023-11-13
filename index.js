import express from 'express'
import { pool } from './database/db.js'

const PORT = process.env.PORT || 4444
console.log(pool)
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello')
})
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
