/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', './particles.json', function () {
	console.log('callback - particles.js config loaded');
});

var qrcode = new QRCode(document.getElementById('qrcode'), {
	text: 'Mozetsu',
	width: 295,
	height: 295,
	colorDark: '#343233',
	colorLight: '#F5DEBA',
	correctLevel: QRCode.CorrectLevel.H,
});

document.querySelector('.app').style.filter = 'blur(3px)';
