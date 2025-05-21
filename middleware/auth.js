const jwt = require("jsonwebtoken")
require("dotenv").config()

const jwtKey = process.env.JWT_KEY

const authenticate = (req, res, next) => {
	const authHeader = req.headers.authorization

	//Check if
	if (!authHeader) {
		return res.status(401).json({ message: `Authorization header missing` })
	}

	//Get token ["Bearer", "token"]
	let token
	if (authHeader.includes(" ")) token = authHeader.split(" ")[1]
	else token = authHeader

	//Check if we did not get a value in a token
	if (!token) {
		return res
			.status(403)
			.json({ message: `Token is missing on header [Authorization]` })
	}

	try {
		const payload = jwt.verify(token, jwtKey)
		req.user = payload

		next()
	} catch (error) {
		if (error) {
			return res.status(500).json({ message: error.message })
		}
	}
}

module.exports = authenticate
