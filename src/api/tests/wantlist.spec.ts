import { WantlistAssertions } from '../assertions/wantlist.assertions';
import { test } from '../../fixtures/fixtures';
import { WantlistResponse } from '../../models/api.models/wantlist.response';

test.describe('Discogs API - wantlist', () => {
  let addedReleaseID: number;

  test.afterEach(async ({ authorizedClients, userName }) => {
    if (addedReleaseID) {
      await authorizedClients.wantlistClient.deleteReleaseFromWantList(userName, addedReleaseID);
      addedReleaseID = 0;
    }
  });

  test(
    'Should return 200 and wantlist by username',
    { tag: ['@API', '@Wantlist', '@Positive'] },
    async ({ authorizedClients, userName }) => {
      const { responseBody } = await authorizedClients.wantlistClient.getWantlistByUsername(
        userName
      );
      WantlistAssertions.validateWantlistResponse(responseBody as WantlistResponse);
    }
  );

  test(
    'Should add random release to want list',
    { tag: ['@API', '@Wantlist', '@Positive'] },
    async ({ authorizedClients, randomReleaseID, userName, randomRelease, currentWantList }) => {
      addedReleaseID = randomReleaseID;

      await authorizedClients.wantlistClient.addReleaseToWantlist(userName, addedReleaseID);
      const wantlistResponse = await currentWantList();

      WantlistAssertions.validateReleaseIsAdded(wantlistResponse, addedReleaseID);
      WantlistAssertions.validateReleaseContent(wantlistResponse, randomRelease);
    }
  );

  test(
    'Should delete release and return 204',
    { tag: ['@API', '@Wantlist', '@Positive'] },
    async ({ authorizedClients, addedReleaseID, userName, currentWantList }) => {
      await authorizedClients.wantlistClient.deleteReleaseFromWantList(userName, addedReleaseID);

      const wantlist = await currentWantList();
      WantlistAssertions.validateReleaseIsDeleted(wantlist, addedReleaseID);
    }
  );
});
