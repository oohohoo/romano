import type { Page } from '@playwright/test';

export class NavigationComponent {
  constructor(private page: Page) {}

  async expectMainLinksVisible() {
    await expect(this.page.locator('.main-nav a')).toHaveCount(4);
  }

  async clickAllLinks() {
    const links = await this.page.locator('.main-nav a').all();
    for (const link of links) {
      await link.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async clickLink(linkText: string) {
    await this.page.click(`.main-nav a:text("${linkText}")`);
  }
}