import { validationResult } from 'express-validator'
import { db } from '../../database/db.js'
class CreateController {
	async create(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json(errors.array())
			}
			const { title, content, user_id, imageUrl } = req.body
			const newPost = await db.query(
				`INSERT INTO posts (title,content,user_id,imageUrl) values ($1,$2,$3,$4) RETURNING *`,
				[title, content, user_id, imageUrl]
			)
			const postData = newPost.rows[0]
			res.json(postData)
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не удалось создать пост',
			})
		}
	}
}

export default new CreateController()
