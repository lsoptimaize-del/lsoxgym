import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

await page.waitForSelector('text=Talk to');
await page.screenshot({ path: '/tmp/contact-section-check.png' });

await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());
await page.waitForTimeout(300);
await page.screenshot({ path: '/tmp/contact-scrolled.png' });

const navHasPricing = await page.evaluate(() => document.body.innerText.includes('Pricing'));
console.log('Nav has Pricing text:', navHasPricing);

const footerExists = await page.$('footer');
console.log('Footer exists:', !!footerExists);

console.log('Console errors:', errors);
await browser.close();
