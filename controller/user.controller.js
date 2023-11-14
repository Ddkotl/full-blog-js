import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import { db } from '../database/db.js'
class UserController {
	async create(req, res) {
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
			res.json(newUser.rows)
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не удалось зарегестрироваться',
			})
		}
	}
	async index(req, res) {
		const users = await db.query(`SELECT * FROM users`)
		res.json(users.rows)
	}
	async show(req, res) {
		const id = req.params.id
		const user = await db.query(`SELECT * FROM users where id = $1`, [id])
		res.json(user.rows)
	}
	async update(req, res) {
		const { id, name, email } = req.body
		const user = await db.query(
			`UPDATE users set name=$1, email=$2 where id=$3 RETURNING *`,
			[name, email, id]
		)
		res.json(user.rows)
	}
	async delete(req, res) {
		const id = req.params.id
		const user = await db.query(`DELETE FROM users where id = $1`, [id])
		res.json('ok')
	}
}

export default new UserController()
