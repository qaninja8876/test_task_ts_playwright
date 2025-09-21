import { test } from '../../fixtures/fixtures';
import { LabelAssertions } from '../assertions/label.assertions';
import { LabelResponse } from '../../models/api.models/label.response';
import { DataHelper } from '../../utils/api.utils/data.helper';
import { EntityErrors } from '../../models/api.models/error.responses';

test.describe('Discogs API - labels', () => {
  test(
    'Should return 200 for a valid label ID',
    { tag: ['@API', '@Label', '@Positive'] },
    async ({ unathorizedClients, randomLabelID }) => {
      const { responseBody } = await unathorizedClients.labelsClient.getLabelById(randomLabelID);
      LabelAssertions.validateCorrectResponse(responseBody as LabelResponse, randomLabelID);
    }
  );
});

test.describe('negative test for invalid artist IDs', () => {
  DataHelper.getInvalidID().forEach(({ invalidID, label }, index) => {
    test(
      `${index + 1}) Should return text error and 404 with invalid ID: ${label}`,
      { tag: ['@API', '@Label', '@Negative'] },
      async ({ unathorizedClients }) => {
        const { responseBody } = await unathorizedClients.labelsClient.getLabelById(invalidID, {
          expectedStatusCode: 404
        });
        LabelAssertions.validateIncorrectResponse(responseBody as EntityErrors);
      }
    );
  });
});
