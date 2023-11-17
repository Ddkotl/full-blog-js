import { validationResult } from 'express-validator'
import { db } from '../../database/db.js'
class UpdateController {
	async update(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json(errors.array())
			}
			const { id, title, content, imageUrl } = req.body
			const category = await db.query(
				`UPDATE categories set title=$1, content=$2, imageUrl=$3 where id=$4 RETURNING *`,
				[title, content, imageUrl, id]
			)
			const categoryData = category.rows[0]
			res.json(categoryData)
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не удалось изменить категорию',
			})
		}
	}
}

export default new UpdateController()
