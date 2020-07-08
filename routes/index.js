const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

router.get('/:code', async (req, res) => {
	try {
		const url = await Url.findOne({ urlCode: req.params.code });

		if (!url) {
			return res.status(404).render('index', { server: '{ 404 - Url not found! 🛸 }' });
		}

		res.redirect(url.longUrl);
	} catch (err) {
		res.status(500).render('index', { server: '{ 500 - Server error! 💀 }' });
	}
});

module.exports = router;
