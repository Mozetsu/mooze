export const qrcodePopupHTML = `<div class="qrcode-container"><button id="close-qrcode"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" /><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" /></svg></button><h1>QR CODE</h1><p>scan the code below with a smartphone</p><canvas id="qrcode"></canvas></div>`;

export function getCurrentYear() {
	const date = new Date();
	document.querySelector('#year').innerHTML = date.getFullYear();
}

export async function copyToClipboard() {
	const str = document.querySelector('#url').innerText;
	await navigator.clipboard.writeText(str);
}

export function displayQRCode() {
	// blur background
	document.querySelector('.app').style.filter = 'blur(5px)';

	// generate HTML element
	const bodyHTML = document.querySelector('body');
	const popUpHTML = document.createElement('div');
	popUpHTML.classList.add('qrcode-popup');
	popUpHTML.innerHTML = qrcodePopupHTML;
	bodyHTML.appendChild(popUpHTML);

	// add click event to qr code popup
	const popUpContainer = document.querySelector('.qrcode-popup');
	popUpContainer.addEventListener('click', (e) => {
		if (e.target.classList[0] === 'qrcode-popup') hideQRCode();
	});

	// generate qr code
	const qr = new QRious({
		element: document.querySelector('#qrcode'),
		value: document.querySelector('#url').innerText,
		background: '#f5deba',
		foreground: '#2a2b2f',
		level: 'H',
		size: 300,
	});

	const leaveBtn = document.querySelector('#close-qrcode');
	leaveBtn.addEventListener('click', hideQRCode);
}

export function hideQRCode() {
	document.querySelector('.app').style.filter = 'none';
	const bodyHTML = document.querySelector('body');
	bodyHTML.removeChild(bodyHTML.children[bodyHTML.children.length - 1]);
}
