import { APIRequestContext, APIResponse } from '@playwright/test';
import { Environment } from '../../env';
import { Endpoints } from '../../utils/constants/endpoints';
import { ApiHelper, ClientOptions, RequestParams } from '../../utils/api.utils/api.helper';
import { EntityErrors } from '../../models/api.models/error.responses';
import { LabelResponse } from '../../models/api.models/label.response';

export class LabelCLient {
  private context: APIRequestContext;
  private getReleasesUrl =
    `${Environment.BASE_URL}${Endpoints.LABELS}${Environment.LABEL_ID}/${Endpoints.RELEASES}`.replace(/\/$/, '');
  private getLabelUrl = `${Environment.BASE_URL}${Endpoints.LABELS}`;

  constructor(context: APIRequestContext) {
    this.context = context;
  }

  async getLabelById(
    id: unknown,
    options?: ClientOptions
  ): Promise<{ responseBody: LabelResponse | EntityErrors; status: number }> {
    const response = await ApiHelper.sendApiRequest(this.context, `${this.getLabelUrl}${id}`, {
      method: 'GET',
      ...options
    });
    return response;
  }

  async getLabelReleases(): Promise<APIResponse> {
    return await this.context.get(this.getReleasesUrl);
  }
}
