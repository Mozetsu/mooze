const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
	urlCode: String,
	longUrl: String,
	shortUrl: String,
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
		index: { expires: 60 * 60 * 24 }, // expire after 24 hours
	},
});

module.exports = mongoose.model('Url', urlSchema);
