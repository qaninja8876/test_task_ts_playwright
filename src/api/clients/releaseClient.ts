import { APIRequestContext } from '@playwright/test';
import { Environment } from '../../env';
import { Endpoints } from '../../utils/constants/endpoints';
import { ApiHelper, ClientOptions, RequestParams } from '../../utils/api.utils/api.helper';
import { ReleaseResponse } from '../../models/api.models/release.response';
import { ReleaseRatingResponse } from '../../models/api.models/release.rating.response';
import { EntityErrors } from '../../models/api.models/error.responses';
import { ReleaseStats } from '../../models/api.models/release.stats.response';

export class ReleaseClient {
  private url = `${Environment.BASE_URL}${Endpoints.RELEASES}`;
  private context: APIRequestContext;

  constructor(context: APIRequestContext) {
    this.context = context;
  }

  async getReleaseById(
    id: unknown,
    options?: ClientOptions
  ): Promise<{ responseBody: ReleaseResponse | EntityErrors; status: number }> {
    const response = await ApiHelper.sendApiRequest(this.context, `${this.url}${id}`, {
      method: 'GET',
      ...options
    });
    return response;
  }

  async getReleaseRatingByReleaseId(
    id: unknown,
    options?: ClientOptions
  ): Promise<{ responseBody: ReleaseRatingResponse; status: number }> {
    const response = await ApiHelper.sendApiRequest(
      this.context,
      `${this.url}${id}/${Endpoints.RELEASE_RATING}`,
      {
        method: 'GET',
        ...options
      }
    );
    return response;
  }
}
