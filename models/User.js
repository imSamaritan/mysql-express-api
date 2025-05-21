const db = require("../db/db")

const find = async (email) => {
	const sql = `
		SELECT * FROM users
		WHERE user_email = ?
	`
	try {
		const [response] = await db.query(sql, [email])
		return response
	} catch (error) {
		if (error) return error
	}
}

const create = async (user) => {
	const { username, email, hashPassword } = user
	const sql = `
		INSERT INTO
			users(user_name, user_email, user_pass)
		VALUES
			(?, ?, ?)
	`
	try {
		const [createUser] = await db.execute(sql, [username, email, hashPassword])
		return createUser
	} catch (error) {
		if (error) return error
	}
}

module.exports = { find, create }
