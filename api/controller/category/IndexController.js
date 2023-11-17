import { db } from '../../database/db.js'
class IndexController {
	async index(req, res) {
		try {
			const categories = await db.query(`SELECT * FROM categories`)
			const categoriesData = categories.rows
			res.json(categoriesData)
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не удалось получить категории',
			})
		}
	}
}

export default new IndexController()
