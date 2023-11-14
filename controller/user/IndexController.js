import { db } from '../../database/db.js'
class IndexController {
	async index(req, res) {
		try {
			const users = await db.query(`SELECT * FROM users`)
			const usersData = users.rows.map(el => {
				const userWithoutPassword = { ...el }
				delete userWithoutPassword.passwordhash
				return userWithoutPassword
			})
			res.json(usersData)
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не получить пользователей',
			})
		}
	}
}

export default new IndexController()
