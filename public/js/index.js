import { getCurrentYear, copyToClipboard, displayQRCode } from './assets.js';

particlesJS.load('particles-js', './particles.json', () => {});

window.onload = () => getCurrentYear();

if (document.querySelector('#url')) {
	const qrCodeBtn = document.querySelector('#qrcode-btn');
	qrCodeBtn.addEventListener('click', displayQRCode);

	const copyBtn = document.querySelector('#copy-btn');
	copyBtn.addEventListener('click', copyToClipboard);
}
