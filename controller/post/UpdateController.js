import { db } from '../../database/db.js'
class UpdateController {
	async update(req, res) {
		try {
			const { title, content, tags, category_id, imageUrl, id } = req.body
			const post = await db.query(
				`UPDATE posts set title=$1, content=$2, category_id=$3, imageUrl=$4 ,updated_at=NOW() where  id=$5 RETURNING *`,
				[title, content, category_id, imageUrl, id]
			)
			const postTags = []
			const tagsArray = JSON.parse(tags)
			if (Array.isArray(tagsArray)) {
				db.query(`DELETE FROM post_tags where post_id = $1`, [post.rows[0].id])
				await Promise.all(
					tagsArray.map(async el => {
						const result = await db.query(
							`INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2) RETURNING *`,
							[post.rows[0].id, el]
						)
						postTags.push(result.rows[0].tag_id)
					})
				)
			}
			const data = post.rows[0]
			res.json({ ...data, postTags })
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не удалось изменить пользователя',
			})
		}
	}
}

export default new UpdateController()
