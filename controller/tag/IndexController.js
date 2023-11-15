import { db } from '../../database/db.js'
class IndexController {
	async index(req, res) {
		try {
			const tags = await db.query(`SELECT * FROM tags`)
			const tagsData = tags.rows
			res.json(tagsData)
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не удалось получить тэги',
			})
		}
	}
}

export default new IndexController()
