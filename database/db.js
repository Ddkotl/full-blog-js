import pkg from 'pg'
const { Pool } = pkg

export const pool = new Pool({
	user: 'postgres',
	password: 'qwe123',
	host: '127.0.0.1',
	port: 5432,
	database: 'full-blog-js',
})
