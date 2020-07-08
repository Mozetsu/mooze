const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const ministring = require('ministring');

const Url = require('../models/Url');

router.post('/', async (req, res) => {
	const { longUrl } = req.body;
	const baseUrl = process.env.BASE_URL;

	if (!validUrl.isUri(baseUrl)) {
		return res.status(401).render('index', { server: '{ Invalid base Url ✋ }' });
	}

	if (!validUrl.isUri(longUrl)) {
		return res.status(401).render('index', { server: '{ Something is wrong with that Url 😐 }' });
	}

	const urlCode = ministring(5);

	try {
		// search url
		let url = await Url.findOne({ longUrl });

		// url already exists
		if (url) {
			return res.render('index', { url: url.shortUrl, displayUrl: `mooze.eu/${url.urlCode}` });
		}

		const shortUrl = `${baseUrl}/${urlCode}`;

		url = new Url({
			longUrl,
			shortUrl,
			urlCode,
		});

		await url.save();

		res.render('index', { url: url.shortUrl, displayUrl: `mooze.eu/${urlCode}` });
	} catch (err) {
		res.status(500).render('index', { server: '{ 500 - Server error! 💀 }' });
	}
});

module.exports = router;
