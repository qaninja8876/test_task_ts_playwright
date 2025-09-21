import { Page } from '@playwright/test';
import { LoginPage } from './login.page';
import { MainPage } from './main.page';
import { WantlistPage } from './wantlist.page';
import { ReleasePage } from './release.page';

export class PageManager {
  readonly loginPage: LoginPage;
  readonly mainPage: MainPage;
  readonly wantlistPage: WantlistPage;
  readonly releasePage: ReleasePage;

  constructor(private readonly page: Page) {
    this.loginPage = new LoginPage(page);
    this.mainPage = new MainPage(page);
    this.wantlistPage = new WantlistPage(page);
    this.releasePage = new ReleasePage(page);
  }
}
