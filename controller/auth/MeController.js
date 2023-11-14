import { db } from '../../database/db.js'
class MeController {
	async getInfoAboutMe(req, res) {
		try {
			const id = req.userId
			const user = await db.query(`SELECT * FROM users where id = $1`, [id])
			const userData = user.rows[0]
			if (!userData) {
				return res.status(404).json({
					message: 'Пользователь не найден',
				})
			}
			res.json({
				userData,
			})
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Нет доступа',
			})
		}
	}
}

export default new MeController()
