import { test as base } from '@playwright/test';
import { DataHelper } from '../../utils/api.utils/data.helper';
import { Fixtures } from '../fixtures';
import { ReleaseResponse } from '../../models/api.models/release.response';
import { Environment } from '../../env';

export const test = base.extend<Fixtures>({
  randomReleases: async ({ unathorizedClients }, use) => {
    const response = await unathorizedClients.labelsClient.getLabelReleases();
    const releases: ReleaseResponse[] = (await response.json()).releases;

    await use(releases);
  },

  randomRelease: async ({ randomReleases }, use) => {
    const release = await DataHelper.getRandomRelease(randomReleases);

    await use(release);
  },

  randomReleaseID: async ({ randomRelease }, use) => {
    await use(randomRelease.id);
  },

  randomArtistID: async ({ unathorizedClients, randomRelease }, use) => {
    const { responseBody } = await unathorizedClients.releaseClient.getReleaseById(
      randomRelease.id
    );
    const fullRelease = responseBody as ReleaseResponse;
    const artistID = fullRelease.artists[0].id;

    await use(artistID);
  },

  randomFullRelease: async ({ unathorizedClients, randomReleaseID }, use) => {
    const { responseBody } = await unathorizedClients.releaseClient.getReleaseById(randomReleaseID);
    if ('title' in responseBody) {
      await use(responseBody);
    } else {
      throw new Error(
        `Expected full release but got error response: ${JSON.stringify(responseBody)}`
      );
    }
  },

  randomLabelID: async ({ unathorizedClients, randomRelease }, use) => {
    const { responseBody } = await unathorizedClients.releaseClient.getReleaseById(
      randomRelease.id
    );
    const fullRelease = responseBody as ReleaseResponse;
    const labelID = fullRelease.labels[0].id;

    await use(labelID);
  },

  userName: async ({}, use) => {
    await use(`${Environment.USER_NAME}`);
  },

  addedReleaseID: async ({ authorizedClients, randomReleaseID }, use) => {
    await authorizedClients.wantlistClient.addReleaseToWantlist(
      `${Environment.USER_NAME}`,
      randomReleaseID
    );

    await use(randomReleaseID);
  },

  currentWantList: async ({ authorizedClients }, use) => {
    await use(async () => {
      const { responseBody } = await authorizedClients.wantlistClient.getWantlistByUsername(
        `${Environment.USER_NAME}`
      );
      return responseBody;
    });
  }
});
