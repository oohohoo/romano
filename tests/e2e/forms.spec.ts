import { test, expect } from '@playwright/test';

test.describe('Forms', () => {
  test('contact form submission', async ({ page }) => {
    await page.goto('/contact');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message');
    await page.click('button[type="submit"]');
    await expect(page.locator('.success-message')).toBeVisible();
  });
});