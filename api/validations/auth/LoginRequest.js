import { body } from 'express-validator'

export const LoginRequest = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен быть больше 5 символов').isLength({ min: 5 }),
]
