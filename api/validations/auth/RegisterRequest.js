import { body } from 'express-validator'

export const RegisterRequest = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен быть больше 5 символов').isLength({ min: 5 }),
	body('name', 'Имя должно быть больше трех символов').isLength({ min: 3 }),
	body('avatarUrl', 'Неверная ссылка на изображение').optional().isURL(),
]
