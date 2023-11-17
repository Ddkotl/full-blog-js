import { validationResult } from 'express-validator'
import { db } from '../../database/db.js'
class CreateController {
	async create(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json(errors.array())
			}
			const { title, content, imageUrl } = req.body
			const newCategory = await db.query(
				`INSERT INTO categories (title,content,imageUrl) values ($1,$2,$3) RETURNING *`,
				[title, content, imageUrl]
			)
			const categoryData = newCategory.rows[0]
			res.json(categoryData)
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не удалось создать категорию',
			})
		}
	}
}

export default new CreateController()
