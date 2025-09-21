import { chromium, FullConfig } from '@playwright/test';
import { Environment } from '../../env';

async function globalSetup(config: FullConfig) {
  const loggedInProject = config.projects.find(p => p.name === 'in-logged-in');
  const { storageState } = loggedInProject!.use;

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const continueButton = page.getByText('Continue', { exact: true });

  await page.goto('https://www.discogs.com/login');
  await page.fill('#username', `${Environment.USER_NAME}`);
  await page.fill('#password', `${Environment.USER_PASSWORD}`);
  await continueButton.click();

  await page.waitForURL('https://www.discogs.com/my');
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;
