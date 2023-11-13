import pkg from 'pg'
const { Pool } = pkg

export const db = new Pool({
	user: 'postgres',
	password: 'qwe123',
	host: '127.0.0.1',
	port: 5432,
	database: 'full-blog-js',
})

db.query('SELECT NOW()', (err, result) => {
	if (err) {
		console.error('DB error:', err)
	} else {
		console.log('DB ok:', result.rows[0])
	}
})
