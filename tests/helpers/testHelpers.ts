import type { Page } from '@playwright/test';

export async function waitForTransition(page: Page) {
  await page.waitForSelector('.is-transitioning', { state: 'attached' });
  await page.waitForSelector('.is-transitioning', { state: 'detached' });
}

export async function checkAccessibility(page: Page) {
  const violations = await page.evaluate(() => {
    // This assumes you've included the axe-core library in your page
    return new Promise(resolve => {
      // @ts-ignore
      axe.run((err, results) => {
        if (err) throw err;
        resolve(results.violations);
      });
    });
  });
  return violations;
}