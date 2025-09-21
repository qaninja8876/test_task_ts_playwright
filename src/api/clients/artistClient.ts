import { APIRequestContext, APIResponse } from '@playwright/test';
import { Environment } from '../../env';
import { Endpoints } from '../../utils/constants/endpoints';
import { ApiHelper, ClientOptions, RequestParams } from '../../utils/api.utils/api.helper';
import { ArtistResponse } from '../../models/api.models/artist.response';
import { EntityErrors } from '../../models/api.models/error.responses';

export class ArtistClient {
  url = `${Environment.BASE_URL}${Endpoints.ARTISTS}`;
  private context: APIRequestContext;

  constructor(context: APIRequestContext) {
    this.context = context;
  }

  async getArtistById(
    id: unknown,
    options?: ClientOptions
  ): Promise<{ responseBody: ArtistResponse | EntityErrors; status: number }> {
    const response = await ApiHelper.sendApiRequest(this.context, `${this.url}${id}`, {
      method: 'GET',
      ...options
    });
    return response;
  }
}
