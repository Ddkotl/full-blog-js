import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import { db } from '../../database/db.js'
class UpdateController {
	async update(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json(errors.array())
			}
			const { id, name, email, password, avatarUrl } = req.body
			const salt = await bcrypt.genSalt(10)
			const passwordHash = await bcrypt.hash(password, salt)
			const user = await db.query(
				`UPDATE users set name=$1, email=$2, passwordhash=$3, avatarurl=$4  where id=$5 RETURNING *`,
				[name, email, passwordHash, avatarUrl, id]
			)
			const userData = user.rows[0]
			delete userData.passwordhash
			res.json(userData)
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не удалось изменить пользователя',
			})
		}
	}
}

export default new UpdateController()
