import { test, expect } from '@playwright/test';

test('page load performance', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('/');
  const loadTime = Date.now() - startTime;
  
  console.log(`Page load time: ${loadTime}ms`);
  expect(loadTime).toBeLessThan(3000); // Adjust threshold as needed

  const performanceTimings = JSON.parse(await page.evaluate(() => JSON.stringify(performance.getEntriesByType('navigation'))));
  console.log('Performance metrics:', performanceTimings);
});