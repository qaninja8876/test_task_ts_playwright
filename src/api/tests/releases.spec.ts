import { test } from '../../fixtures/fixtures';
import { DataHelper } from '../../utils/api.utils/data.helper';
import { ReleaseAssertions } from '../assertions/release.assertions';
import { ReleaseResponse } from '../../models/api.models/release.response';
import { EntityErrors } from '../../models/api.models/error.responses';

test.describe('Discogs API - Releases', () => {
  test(
    'Should return 200, get release',
    { tag: ['@API', '@Release', '@Positive'] },
    async ({ unathorizedClients, randomReleaseID, randomRelease }) => {
      const { responseBody } = await unathorizedClients.releaseClient.getReleaseById(
        randomReleaseID
      );

      ReleaseAssertions.validateCorrectResponseRelease(
        responseBody as ReleaseResponse,
        randomRelease,
        randomReleaseID
      );
    }
  );

  test(
    'Should return 200 and get release rating',
    { tag: ['@API', '@Release', '@Positive'] },
    async ({ unathorizedClients, randomReleaseID }) => {
      const { responseBody } = await unathorizedClients.releaseClient.getReleaseRatingByReleaseId(
        randomReleaseID
      );
      ReleaseAssertions.validateReleaseRating(responseBody);
    }
  );
});

test.describe('Negative test for invalid release IDs', () => {
  DataHelper.getInvalidID().forEach(({ label, invalidID }, index) => {
    test(
      `${index + 1}) Should return text error and 404 with invalid ID: ${label}`,
      { tag: ['@API', '@Release', '@Negative'] },
      async ({ unathorizedClients }) => {
        const { responseBody } = await unathorizedClients.releaseClient.getReleaseById(invalidID, {
          expectedStatusCode: 404
        });
        ReleaseAssertions.validateIncorrectResponseRelease(responseBody as EntityErrors);
      }
    );
  });
});
