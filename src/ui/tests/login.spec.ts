import { test } from '../../fixtures/ui.fixtures/ui.data';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe(
  'Check login with correct and incorrect credentials',
  { tag: ['@UI', '@Login', '@Positive'] },
  async () => {
    test.beforeEach(async ({ pageManager }) => {
      await pageManager.loginPage.goto();
    });

    test('Login flow with valid credentials', async ({ pageManager, uiUserName }) => {
      await pageManager.loginPage.enterLoginCredentialsAndClickContinue('positive');
      await pageManager.mainPage.verifyUserAfterLogin(uiUserName);
    });

    test(
      'Login flow with unknown credentials',
      { tag: ['@UI', '@Login', '@Negative'] },
      async ({ pageManager }) => {
        await pageManager.loginPage.enterLoginCredentialsAndClickContinue('negative');
        await pageManager.loginPage.checkErrorMessage();
      }
    );
  }
);
