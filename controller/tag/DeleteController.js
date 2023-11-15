import { db } from '../../database/db.js'
class DeleteController {
	async delete(req, res) {
		try {
			const id = req.params.id
			const tag = await db.query(`DELETE FROM tags where id = $1`, [id])
			res.json({ message: 'Удаление успешно' })
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Не удалось удалить',
			})
		}
	}
}

export default new DeleteController()
