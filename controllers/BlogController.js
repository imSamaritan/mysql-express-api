const index = async (req, res) => {
	res.send(req.user)
}

module.exports = { index }
