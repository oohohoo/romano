import { test, expect } from '@playwright/test';
import { NavigationComponent } from '../pageObjects/NavigationComponent';

test.describe('Navigation', () => {
  test('main navigation links are visible and clickable', async ({ page }) => {
    await page.goto('/');
    const nav = new NavigationComponent(page);
    await nav.expectMainLinksVisible();
    await nav.clickAllLinks();
  });

  test('page transitions work correctly', async ({ page }) => {
    await page.goto('/');
    const nav = new NavigationComponent(page);
    await nav.clickLink('About');
    await expect(page).toHaveURL('/about');
    await expect(page.locator('.loader')).toBeVisible();
    await expect(page.locator('.loader')).not.toBeVisible({ timeout: 5000 });
  });
});