// @ts-check
const { test, expect } = require('@playwright/test');

// eslint-disable-next-line jest/no-done-callback
test('homepage has Playwright in title and get started link linking to the intro page', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await expect(page).toHaveTitle(/Webpack Package/);
  await page.locator('id=url-input').fill('https://ru.hexlet.io/lessons.rss');
  await page.locator('text=Добавить').click();
});
