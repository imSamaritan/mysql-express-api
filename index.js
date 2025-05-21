const express = require("express")
const cors = require("cors")
const appRoutes = require("./routes/appRoutes")
const authRoutes = require("./routes/authRoutes")
require("dotenv").config()

const server = express()
const PORT = process.env.PORT || 5000

server.use(cors())
server.use(express.json())

server.get("/", (req, res) => res.redirect("/api/blogs"))
server.use("/auth", authRoutes)
server.use("/api", appRoutes)

server.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`)
})
