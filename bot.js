const puppeteer = require('puppeteer');

// Settings
let settingsHeadless = false;

// Text Sources
const textSalutations = require('./texts/salutations.json');
const textIntroductions = require('./texts/introductions.json');
const textPlaces = require('./texts/places.json');
const textReason = require('./texts/reasons.json');
const textNames = require('./texts/names.json');
const textLastnames = require('./texts/lastnames.json');
const textCities = require('./texts/cities.json');
const textMailhosts = require('./texts/mailhosts.json');
const textWebsiteintroductions = require('./texts/websiteintroductions.json');
const textWebsiteparts = require('./texts/websiteparts.json');
const textWebsitepartsinbetweens = require('./texts/websitepartsinbetweens.json');
const textEndings = require('./texts/endings.json');
const textEndingSalutations = require('./texts/endingsalutations.json');

(async () => {
	console.log("===");
	console.log("Generating new Message");

	let randomSalutation = textSalutations[Math.floor(Math.random()*textSalutations.length)];
	let randomIntroduction = textIntroductions[Math.floor(Math.random()*textIntroductions.length)];
	let randomPlace = textPlaces[Math.floor(Math.random()*textPlaces.length)];
	let randomReason = textReason[Math.floor(Math.random()*textReason.length)];
	let randomName = textNames[Math.floor(Math.random()*textNames.length)];
	let randomLastname = textLastnames[Math.floor(Math.random()*textLastnames.length)];
	let randomCity = textCities[Math.floor(Math.random()*textCities.length)];
	let randomMailhost = textMailhosts[Math.floor(Math.random()*textMailhosts.length)];

	let constructedMail = randomName + "." + randomLastname + "@" + randomMailhost;

	randomIntroduction = randomIntroduction.replace("{NAME}", randomName + " " + randomLastname);
	randomIntroduction = randomIntroduction.replace("{REASON}", randomReason);
	randomIntroduction = randomIntroduction.replace("{PLACE}", randomPlace);

	let randomWebsiteIntroduction = textWebsiteintroductions[Math.floor(Math.random()*textWebsiteintroductions.length)];
	let randomWebsitePart1 = textWebsiteparts[Math.floor(Math.random()*textWebsiteparts.length)];
	let randomWebsitePart2 = textWebsiteparts[Math.floor(Math.random()*textWebsiteparts.length)];
	let randomWebsitePartsInbetween = textWebsitepartsinbetweens[Math.floor(Math.random()*textWebsitepartsinbetweens.length)];
	let constructedWebsite = randomWebsitePart1 + "-" + randomWebsitePartsInbetween + "-" + randomWebsitePart2 + ".de";

	let randomEnding = textEndings[Math.floor(Math.random()*textEndings.length)];
	let randomEndingsalutation = textEndingSalutations[Math.floor(Math.random()*textEndingSalutations.length)];

	let currentDate = new Date();
	let constructedDate = currentDate.getDate() + "." + currentDate.getMonth() + "." + currentDate.getFullYear();

	let outputMessage = randomSalutation + ", \n" + randomIntroduction + "\n\n" + randomWebsiteIntroduction + constructedWebsite + "\n\n" + randomEnding + "\n\n" + randomEndingsalutation + "\n" + randomName + " " + randomLastname;

	console.log("Opening Browser");

	const browser = await puppeteer.launch({
		headless: settingsHeadless,
		defaultViewport: { width: 1280, height: 920 }
	});
	const page = await browser.newPage();
	
	console.log("Loading Page");

	// Open page.
	await page.goto('https://www.blicknachlinks.org/inhalte-vorschlagen/');
	
	console.log("Filling Inputs");

	// Name
	await page.focus('#et_pb_contact_name_0');
	await page.keyboard.type(randomName + " " + randomLastname);
	
	// E-Mail
	await page.focus('#et_pb_contact_email_0');
	await page.keyboard.type(constructedMail.toLowerCase());
	
	// Url
	await page.focus('#et_pb_contact_url_0');
	await page.keyboard.type(constructedWebsite);
	
	// Datum
	await page.focus('#et_pb_contact_date_0');
	await page.keyboard.type(constructedDate);
	
	// Ort
	await page.focus('#et_pb_contact_place_0');
	await page.keyboard.type(randomCity);
	
	// Nachricht
	await page.focus('#et_pb_contact_message_0');
	await page.keyboard.type(outputMessage);
	
	console.log("Solving Captcha");
	
	// Get Captcha
	let captchaInputFirst = await page.evaluate(() => document.querySelector("input[name='et_pb_contact_captcha_0']").getAttribute('data-first_digit'));
	let captchaInputSecond = await page.evaluate(() => document.querySelector("input[name='et_pb_contact_captcha_0']").getAttribute('data-second_digit'));
	let captchaValue = +captchaInputFirst + +captchaInputSecond;
	
	// Fill Captcha
	await page.focus('.et_pb_contact_captcha');
	await page.keyboard.type(captchaValue.toString());
	
	console.log("Sending Form");

	// Submit the form.
	await page.evaluate(() => document.querySelector('.et_pb_contact_submit').click());

	console.log("Done, next one!");

	// Keep the browser open.
	browser.close();
})();