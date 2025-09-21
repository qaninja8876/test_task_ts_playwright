import { APIRequestContext } from '@playwright/test';
import { ReleaseClient } from './releaseClient';
import { ArtistClient } from './artistClient';
import { LabelCLient } from './labelClient';
import { WantlistClient } from './wantlistClient';

export class ClientManager {
  releaseClient: ReleaseClient;
  artistClient: ArtistClient;
  labelsClient: LabelCLient;
  wantlistClient: WantlistClient;

  constructor(private readonly context: APIRequestContext) {
    this.releaseClient = new ReleaseClient(context);
    this.artistClient = new ArtistClient(context);
    this.labelsClient = new LabelCLient(context);
    this.wantlistClient = new WantlistClient(context);
  }
}
