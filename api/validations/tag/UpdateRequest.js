import { body } from 'express-validator'

export const UpdateRequest = [
	body('title', 'Неверный заголовок').isLength({ min: 3 }).isString(),
]
