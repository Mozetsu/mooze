const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const ministring = require('ministring');

const Url = require('../models/Url');

router.post('/', async (req, res) => {
	const { longUrl } = req.body;
	const baseUrl = process.env.BASE_URL;

	if (!validUrl.isUri(baseUrl)) {
		return res.status(401).json('Invalid base url');
	}

	const urlCode = ministring(5);

	if (validUrl.isUri(longUrl)) {
		try {
			let url = await Url.findOne({ longUrl });

			if (url) {
				res.render('index', { url: url.shortUrl, displayUrl: `mooze.eu/${url.urlCode}` });
			} else {
				const shortUrl = `${baseUrl}/${urlCode}`;

				url = new Url({
					longUrl,
					shortUrl,
					urlCode,
				});

				await url.save();

				res.render('index', { url: url.shortUrl, displayUrl: `mooze.eu/${urlCode}` });
			}
		} catch (err) {
			console.error(err);
			res.status(500).json('Server error');
		}
	} else {
		res.status(401).json('Invalid long url');
	}
});

module.exports = router;