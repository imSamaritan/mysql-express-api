const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const jwtKey = process.env.JWT_KEY

const register = async (req, res) => {
	const { username, email, password } = req.body
	const response = await User.find(email)

	if (response.length > 0) {
		return res.status(404).json({ message: "User already exists" })
	}

	const hashPassword = await bcrypt.hash(password, 10)
	const createUser = await User.create({
		username,
		email,
		hashPassword,
	})

	if (createUser.affectedRows === 1) {
		return res.status(201).json({ message: "User created" })
	}
}

const login = async (req, res) => {
	const { email, password } = req.body
	//Querying a user from db
	const request = await User.find(email)

	//Check results array is []
	if (request.length < 1) {
		return res
			.status(404)
			.json({ message: `User with email ${email}, not registered!` })
	}

	const user = request[0]
	const passwordMatch = await bcrypt.compare(password, user.user_pass)

	if (!passwordMatch) {
		return res.status(401).json({ message: `Please check your password` })
	}

	const token = jwt.sign({ id: user.id, email: user.user_email }, jwtKey, {
		expiresIn: "1h",
	})

	return res.status(200).json({ message: "User logged in", token })
}

module.exports = { register, login }
