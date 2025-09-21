import { APIRequestContext } from '@playwright/test';
import { ClientManager } from '../api/clients/clientManager';
import { authorizationFixtures } from './api.fixtures/auth';
import { test as randomRelease } from './api.fixtures/data';
import { mergeTests } from '@playwright/test';
import { ReleaseResponse } from '../models/api.models/release.response';
import { WantlistResponse } from '../models/api.models/wantlist.response';
import { PageManager } from '../ui/pages/page.manager';
import { test as uiFixtures } from '../fixtures/ui.fixtures/ui.data';
import { EntityErrors } from '../models/api.models/error.responses';

export type Fixtures = {
  authorizedContext: APIRequestContext;
  unathorizedContext: APIRequestContext;
  testData: number;
  unathorizedClients: ClientManager;
  authorizedClients: ClientManager;
  randomRelease: ReleaseResponse;
  randomReleases: ReleaseResponse[];
  randomReleaseID: number;
  randomArtistID: number;
  randomLabelID: number;
  randomInvalidID: unknown;
  addedReleaseID: number;
  userName: string;
  randomFullRelease: ReleaseResponse;
  currentWantList: () => Promise<WantlistResponse>;
};

export type UIFixtures = {
  uiUserName: string;
  pageManager: PageManager;
};

export const test = mergeTests(authorizationFixtures, randomRelease, uiFixtures);
