import { body } from 'express-validator'

export const CreateRequest = [
	body('title', 'Неверный заголовок').isString(),
	body('content', 'Неверный контент').isString(),
	body('user_id', 'Id долженбыть числом').isInt(),
	body('imageUrl', 'Неверная ссылка на изображение').optional().isURL(),
]
