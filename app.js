const qrCodeBtn = document.querySelector('.fa-qrcode');
const copyToClipboardBtn = document.querySelector('.fa-copy');
const qrCodeContainer = document.querySelector('.qrcode-container');

qrCodeBtn.addEventListener('click', displayQRCode);
copyToClipboardBtn.addEventListener('click', copyToClipboard);

function displayQRCode() {
	qrCodeContainer.style.display = qrCodeContainer.style.display === 'none' ? 'flex' : 'none';
}

function copyToClipboard() {
	const link = document.querySelector('.mini-url').childNodes[0].text;
	navigator.clipboard.writeText(link).then(
		() => console.log('Copied to clipboard!'),
		err => console.error('Could not copy text: ', err)
	);
}

// Create QRCode
new QRious({
	value: document.querySelector('.mini-url').childNodes[0].text,
	element: document.getElementById('qrcode'),
	size: 400,
	padding: 50,
	level: 'l'
});

document.addEventListener('mouseup', e => {
	if (e.target.classList[0] === 'qrcode-container') {
		qrCodeContainer.style.display = 'none';
	}
});
