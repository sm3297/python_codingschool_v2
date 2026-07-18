const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));
  
  await page.goto('http://localhost:5174/login');
  await page.type('input[placeholder="아이디를 입력하세요"]', 'test');
  await page.type('input[placeholder="비밀번호를 입력하세요"]', 'test');
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  await page.goto('http://localhost:5174/student/stage/1/mission/stage1-mission1');
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
