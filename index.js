const puppeteer = require('puppeteer');

(async () => {
	console.log("Opening Browser");
	
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: { width: 1280, height: 920 }
	});
	const page = await browser.newPage();
	
	console.log("Loading Page");

	// Open page.
	await page.goto('https://www.blicknachlinks.org/inhalte-vorschlagen/');
	
	console.log("Filling Inputs");

	// Name
	await page.focus('#et_pb_contact_name_0');
	await page.keyboard.type('Max');
	
	// E-Mail
	await page.focus('#et_pb_contact_email_0');
	await page.keyboard.type('max.mustermann@muster.de');
	
	// Url
	await page.focus('#et_pb_contact_url_0');
	await page.keyboard.type('muster.de');
	
	// Datum
	await page.focus('#et_pb_contact_date_0');
	await page.keyboard.type('13.03.2037');
	
	// Ort
	await page.focus('#et_pb_contact_place_0');
	await page.keyboard.type('Musterstadt');
	
	// Nachricht
	await page.focus('#et_pb_contact_message_0');
	await page.keyboard.type('Lorem ipsum dolor sit amet');
	
	console.log("Finding Captcha Values");
	
	// Get Captcha
	let captchaInputFirst = await page.evaluate(() => document.querySelector("input[name='et_pb_contact_captcha_0']").getAttribute('data-first_digit'));
	let captchaInputSecond = await page.evaluate(() => document.querySelector("input[name='et_pb_contact_captcha_0']").getAttribute('data-second_digit'));
	let captchaValue = +captchaInputFirst + +captchaInputSecond;
	
	console.log("Captcha Answer: " + captchaValue);
	console.log("Filling Captcha");
	
	// Fill Captcha
	await page.focus('.et_pb_contact_captcha');
	await page.keyboard.type(captchaValue.toString());
	
	console.log("Sending Form");

	// Submit the form.
	await page.evaluate(() => document.querySelector('.et_pb_contact_submit').click());

	// Keep the browser open.
	// browser.close();
})();