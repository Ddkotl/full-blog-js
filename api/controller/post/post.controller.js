import { db } from '../../database/db.js'
class PostController {
	async create(req, res) {
		const { title, content, user_id } = req.body
		const newPost = await db.query(
			`INSERT INTO posts (title,content,user_id) values ($1,$2,$3) RETURNING *`,
			[title, content, user_id]
		)
		res.json(newPost.rows)
	}
	async index(req, res) {
		const posts = await db.query(`SELECT * FROM posts`)
		res.json(posts.rows)
	}
	async show(req, res) {
		const id = req.params.id
		const post = await db.query(`SELECT * FROM posts where id = $1`, [id])
		res.json(post.rows)
	}
	async update(req, res) {
		const { id, title, content, user_id } = req.body
		const post = await db.query(
			`UPDATE posts set title=$1, content=$2, user_id=$3 where id=$4 RETURNING *`,
			[title, content, user_id, id]
		)
		res.json(post.rows)
	}
	async delete(req, res) {
		const id = req.params.id
		const post = await db.query(`DELETE FROM posts where id = $1`, [id])
		res.json('ok')
	}

	async getPostsByUser(req, res) {
		const id = req.query.id
		const post = await db.query(`SELECT * FROM posts where user_id = $1`, [id])
		res.json(post.rows)
	}
}

export default new PostController()
