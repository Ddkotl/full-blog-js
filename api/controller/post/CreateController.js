import { db } from '../../database/db.js'
class CreateController {
	async create(req, res) {
		try {
			const { title, content, tags, category_id, imageUrl } = req.body
			const user_id = req.userId
			const newPost = await db.query(
				`INSERT INTO posts (title,content,user_id,category_id, imageUrl) values ($1,$2,$3,$4,$5) RETURNING *`,
				[title, content, user_id, category_id, imageUrl]
			)
			const postTags = []
			const tagsArray = JSON.parse(tags)
			if (Array.isArray(tagsArray)) {
				await Promise.all(
					tagsArray.map(async el => {
						const result = await db.query(
							`INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2) RETURNING *`,
							[newPost.rows[0].id, el]
						)
						postTags.push(result.rows[0].tag_id)
					})
				)
			}
			const data = newPost.rows[0]
			res.json({ ...data, postTags })
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не удалось создать пост',
			})
		}
	}
}

export default new CreateController()
