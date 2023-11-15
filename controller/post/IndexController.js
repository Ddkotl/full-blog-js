import { db } from '../../database/db.js'
class IndexController {
	async index(req, res) {
		try {
			const posts = await db.query(`SELECT * FROM posts`)
			const postTags = await db.query(`SELECT * FROM post_tags `)
			const data = posts.rows.map(post => {
				const tags = postTags.rows
					.filter(tag => tag.post_id === post.id)
					.map(tag => tag.tag_id)
				return { ...post, tags }
			})
			res.json(data)
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не удалось получить посты',
			})
		}
	}
}

export default new IndexController()
