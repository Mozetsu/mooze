import { qrcodePopupHTML } from './assets.js';

window.onload = () => getCurrentYear();

function getCurrentYear() {
	const date = new Date();
	document.querySelector('#year').innerHTML = date.getFullYear();
}

const qrCodeBtn = document.querySelector('#qrcode-btn');
qrCodeBtn.addEventListener('click', displayQRCode);

const copyBtn = document.querySelector('#copy-btn');
copyBtn.addEventListener('click', copyToClipboard);

async function copyToClipboard() {
	const str = document.querySelector('#url').innerText;
	await navigator.clipboard.writeText(str);
}

let leaveBtn = undefined;
function displayQRCode() {
	document.querySelector('.app').style.filter = 'blur(3px)';
	const bodyHTML = document.querySelector('body');
	const popUpHTML = document.createElement('div');
	popUpHTML.classList.add('qrcode-popup');
	popUpHTML.innerHTML = qrcodePopupHTML;
	bodyHTML.appendChild(popUpHTML);

	var qr = new QRious({
		element: document.querySelector('#qrcode'),
		value: document.querySelector('#url').innerText,
		background: '#f5deba',
		foreground: '#2a2b2f',
		level: 'H',
		size: 300,
	});

	leaveBtn = document.querySelector('#close-qrcode');
	leaveBtn.addEventListener('click', hideQRCode);
}

function hideQRCode() {
	document.querySelector('.app').style.filter = 'none';
	const bodyHTML = document.querySelector('body');
	bodyHTML.removeChild(bodyHTML.children[bodyHTML.children.length - 1]);
}

particlesJS.load('particles-js', './particles.json', () => {});
