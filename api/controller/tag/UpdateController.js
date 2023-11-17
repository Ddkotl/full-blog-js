import { validationResult } from 'express-validator'
import { db } from '../../database/db.js'
class UpdateController {
	async update(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json(errors.array())
			}
			const { id, title } = req.body
			const tag = await db.query(
				`UPDATE tags set title=$1 where id=$2 RETURNING *`,
				[title, id]
			)
			const tagData = tag.rows[0]
			res.json(tagData)
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не удалось изменить тэг',
			})
		}
	}
}

export default new UpdateController()
