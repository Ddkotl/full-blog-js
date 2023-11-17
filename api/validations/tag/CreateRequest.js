import { body } from 'express-validator'

export const CreateRequest = [
	body('title', 'Неверный заголовок').isLength({ min: 3 }).isString(),
]
