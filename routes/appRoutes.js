const express = require("express")
const authenticate = require("../middleware/auth")
const BlogController = require("../controllers/BlogController")

const router = express.Router()

router.get("/blogs", authenticate, BlogController.index)

module.exports = router
