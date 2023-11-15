import { validationResult } from 'express-validator'
import { db } from '../../database/db.js'
class CreateController {
	async create(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json(errors.array())
			}
			const { title } = req.body
			const newTag = await db.query(
				`INSERT INTO tags (title) values ($1) RETURNING *`,
				[title]
			)
			const tagData = newTag.rows[0]
			res.json(tagData)
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не удалось создать тэг',
			})
		}
	}
}

export default new CreateController()
