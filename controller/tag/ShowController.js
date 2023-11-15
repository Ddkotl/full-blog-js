import { db } from '../../database/db.js'
class ShowController {
	async show(req, res) {
		try {
			const id = req.params.id
			const tag = await db.query(`SELECT * FROM tags where id = $1`, [id])
			const tagData = tag.rows[0]
			res.json(tagData)
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не удалось получить пользователя',
			})
		}
	}
}

export default new ShowController()
