import { db } from '../../database/db.js'
class ShowController {
	async show(req, res) {
		try {
			const id = req.params.id
			const category = await db.query(
				`SELECT * FROM categories where id = $1`,
				[id]
			)
			const categoryData = category.rows[0]
			res.json(categoryData)
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не удалось получить категорию',
			})
		}
	}
}

export default new ShowController()
