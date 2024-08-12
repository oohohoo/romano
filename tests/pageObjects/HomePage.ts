import type { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/');
  }

  async getTitle() {
    return await this.page.title();
  }

  async scrollToPortfolio() {
    await this.page.click('text=View Portfolio');
  }
}