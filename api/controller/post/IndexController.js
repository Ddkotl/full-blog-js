import { db } from '../../database/db.js'

class IndexController {
	async index(req, res) {
		try {
			const postsData = await db.query(`
        SELECT
          posts.id,
          posts.title,
          posts.content,
          posts.user_id,
          posts.category_id,
          posts.viewscount,
          posts.imageurl,
          posts.created_at,
          posts.updated_at,
          categories.title AS category_title,
          tags.title AS tag_title,
          post_tags.tag_id
        FROM
          posts
        LEFT JOIN
          categories ON posts.category_id = categories.id
        LEFT JOIN
          post_tags ON posts.id = post_tags.post_id
        LEFT JOIN
          tags ON post_tags.tag_id = tags.id
      `)

			const data = postsData.rows.reduce((acc, row) => {
				const existingPost = acc.find(post => post.id === row.id)

				if (existingPost) {
					if (row.tag_id) {
						existingPost.tags.push({ id: row.tag_id, title: row.tag_title })
					}
				} else {
					acc.push({
						id: row.id,
						title: row.title,
						content: row.content,
						user_id: row.user_id,
						category_id: row.category_id,
						viewscount: row.viewscount,
						imageurl: row.imageurl,
						created_at: row.created_at,
						updated_at: row.updated_at,
						category: {
							id: row.category_id,
							title: row.category_title,
						},
						tags: row.tag_id ? [{ id: row.tag_id, title: row.tag_title }] : [],
					})
				}

				return acc
			}, [])

			res.json(data)
		} catch (err) {
			console.error(err)
			res.status(500).json({
				message: 'Не удалось получить посты с категориями и тегами',
			})
		}
	}
}

export default new IndexController()
