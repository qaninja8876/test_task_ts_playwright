import { test as base, request } from '@playwright/test';
import { Fixtures } from '../fixtures';
import { Environment } from '../../env';
import { ClientManager } from '../../api/clients/clientManager';

export const authorizationFixtures = base.extend<Fixtures>({
  authorizedContext: async ({}, use) => {
    const context = await request.newContext({
      baseURL: Environment.BASE_URL,
      extraHTTPHeaders: {
        'User-Agent': Environment.USER_AGENT || '',
        Authorization: `Discogs token=${Environment.PERSONAL_TOKEN}`
      }
    });
    await use(context);
    await context.dispose();
  },

  unathorizedContext: async ({}, use) => {
    const context = await request.newContext();

    await use(context);
    await context.dispose();
  },

  unathorizedClients: async ({ unathorizedContext }, use) => {
    const clientManager = new ClientManager(unathorizedContext);
    await use(clientManager);
  },

  authorizedClients: async ({ authorizedContext }, use) => {
    const clientManager = new ClientManager(authorizedContext);
    await use(clientManager);
  }
});
