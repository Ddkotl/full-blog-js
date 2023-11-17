import { db } from '../../database/db.js'
class DeleteController {
	async delete(req, res) {
		try {
			const id = req.params.id
			const user = await db.query(`DELETE FROM categories where id = $1`, [id])
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
