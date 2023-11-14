import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '../../database/db.js'
class LoginController {
	async login(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json(errors.array())
			}
			const email = req.body.email
			const password = req.body.password
			const user = await db.query(`SELECT * FROM users where email = $1`, [
				email,
			])
			const userData = user.rows[0]
			if (!userData) {
				return res.status(404).json({
					message: 'Пользователь не найден',
				})
			}
			const isValidPassowd = await bcrypt.compare(
				password,
				userData.passwordhash
			)
			if (!isValidPassowd) {
				return res.status(404).json({
					message: 'Пароли не совпадают',
				})
			}
			const token = jwt.sign(
				{
					id: userData.id,
				},
				'secret123',
				{
					expiresIn: '30d',
				}
			)
			delete userData.passwordhash
			res.json({ userData, token })
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не удалось войти',
			})
		}
	}
}

export default new LoginController()
