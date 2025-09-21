import { Locator, Page } from '@playwright/test';

export type LocatorMap = {
  [key: string]: Locator;
};

export abstract class BasePage {
  protected page: Page;

  acceptCookiesLocatorText = 'button:has-text("Accept All")';

  constructor(page: Page) {
    this.page = page;
  }

  async gotoByUrl(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async acceptCookie() {
    const acceptCookies = this.page.locator(this.acceptCookiesLocatorText);

    if (await acceptCookies.isVisible()) {
      await acceptCookies.click();
    }
  }
}
