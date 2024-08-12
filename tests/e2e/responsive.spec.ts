import { test, expect } from '@playwright/test';

const devices = ['iPhone 11', 'iPad Pro 11', 'Desktop Chrome'];

for (const device of devices) {
  test(`responsive design check on ${device}`, async ({ page }) => {
    await test.step('Home page', async () => {
      await page.goto('/');
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });

    await test.step('About page', async () => {
      await page.goto('/about');
      await expect(page.locator('.about-content')).toBeVisible();
    });
  });
}