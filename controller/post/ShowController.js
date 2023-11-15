import { db } from '../../database/db.js'
class ShowController {
	async show(req, res) {
		try {
			const id = req.params.id
			const post = await db.query(`SELECT * FROM posts where id = $1`, [id])
			const postTags = await db.query(
				`SELECT * FROM post_tags where post_id = $1`,
				[id]
			)
			const data = post.rows[0]
			const tags = [postTags.rows[0].tag_id]
			res.json({ ...data, tags })
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не получить пользователя',
			})
		}
	}
}

export default new ShowController()
