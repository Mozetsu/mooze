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
		() => {
			const notification = document.createElement('div');
			notification.className = 'notification';
			notification.innerHTML = `<i class="fas fa-check"></i>
      <p>Copied to Clipboard</p>
      <i class="fas fa-times"></i>`;
			document.querySelector('.container').appendChild(notification);

			// adds notification to DOM
			setTimeout(() => {
				document.querySelector('.notification').style.animation = 'hideNotification 0.3s ease-in-out';

				// removes notification div from DOM
				setTimeout(() => {
					document.querySelector('.container').removeChild(document.querySelector('.notification'));
				}, 290);
			}, 1000);
		},
		err => console.error('Could not copy text: ', err)
	);
}

// Create QRCode
new QRious({
	value: document.querySelector('.mini-url').childNodes[0].text,
	element: document.getElementById('qrcode'),
	size: 400,
	padding: 30,
	level: 'l'
});

document.addEventListener('mouseup', e => {
	if (e.target.classList[0] === 'qrcode-container') {
		qrCodeContainer.style.display = 'none';
	}
});
