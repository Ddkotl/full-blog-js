import { db } from '../database/db.js'
class UserController {
	async create(req, res) {
		const { name, email } = req.body
		const newUser = await db.query(
			`INSERT INTO users (name,email) values ($1,$2) RETURNING *`,
			[name, email]
		)
		res.json(newUser.rows)
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
