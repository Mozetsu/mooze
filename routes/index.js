const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

router.get('/:code', async (req, res) => {
	try {
		const url = await Url.findOne({ urlCode: req.params.code });
		if (!url) res.status(404).send({ 404: 'Url not found!' });
		res.redirect(url.longUrl);
	} catch (err) {
		res.status(500).json('Server error');
	}
});

module.exports = router;
