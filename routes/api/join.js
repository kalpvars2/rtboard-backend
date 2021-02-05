const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	res.json("Hello from join page.");
});

module.exports = router;