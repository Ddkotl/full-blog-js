import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { db } from '../../database/db.js'
class RegisterController {
	async register(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json(errors.array())
			}
			const { name, email, password, avatarUrl } = req.body
			const salt = await bcrypt.genSalt(10)
			const passwordHash = await bcrypt.hash(password, salt)
			const newUser = await db.query(
				`INSERT INTO users (name,email,passwordHash,avatarUrl) values ($1,$2,$3,$4) RETURNING *`,
				[name, email, passwordHash, avatarUrl]
			)
			const userData = newUser.rows[0]
			const token = jwt.sign({ id: userData.id }, 'secret123', {
				expiresIn: '30d',
			})

			delete userData.passwordhash
			res.json({ ...userData, token })
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не удалось зарегестрироваться',
			})
		}
	}
}

export default new RegisterController()
