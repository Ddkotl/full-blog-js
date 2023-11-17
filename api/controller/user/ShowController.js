import { db } from '../../database/db.js'
class ShowController {
	async show(req, res) {
		try {
			const id = req.params.id
			const user = await db.query(`SELECT * FROM users where id = $1`, [id])
			const userData = user.rows[0]
			delete userData.passwordhash
			res.json(userData)
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не получить пользователя',
			})
		}
	}
}

export default new ShowController()
