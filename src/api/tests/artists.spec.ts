import { test } from '../../fixtures/fixtures';
import { ArtistAssertions } from '../assertions/artist.assertions';
import { DataHelper } from '../../utils/api.utils/data.helper';
import { ArtistResponse } from '../../models/api.models/artist.response';
import { EntityErrors } from '../../models/api.models/error.responses';

test.describe('Discogs API - artists', () => {
  test(
    'Should return 200 for a valid release ID',
    { tag: ['@API', '@Artist', '@Positive'] },
    async ({ unathorizedClients, randomArtistID }) => {
      const { responseBody } = await unathorizedClients.artistClient.getArtistById(randomArtistID);
      ArtistAssertions.validateCorrectResponse(responseBody as ArtistResponse, randomArtistID);
    }
  );
});

test.describe('Negative test for invalid artist IDs', () => {
  DataHelper.getInvalidID().forEach(({ invalidID, label }, index) => {
    test(
      `${index + 1}) Should return text error and 404 with invalid ID: ${label}`,
      { tag: ['@API', '@Artist', '@Negative'] },
      async ({ unathorizedClients }) => {
        const { responseBody } = await unathorizedClients.artistClient.getArtistById(invalidID, {
          expectedStatusCode: 404
        });
        ArtistAssertions.validateIncorrectResponse(responseBody as EntityErrors);
      }
    );
  });
});
