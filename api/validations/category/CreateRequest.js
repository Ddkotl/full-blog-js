import { body } from 'express-validator'

export const CreateRequest = [
	body('title', 'Неверный заголовок').isLength({ min: 3 }).isString(),
	body('content', 'Неверное описание')
		.optional()
		.isLength({ min: 10 })
		.isString(),
	body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]
