import { ReleaseResponse } from '../../models/api.models/release.response';
import { faker } from '@faker-js/faker';

export class DataHelper {
  static async getRandomRelease(releases: ReleaseResponse[]): Promise<ReleaseResponse> {
    const randomRelease = Math.floor(Math.random() * releases.length);
    return releases[randomRelease];
  }

  static getInvalidID(): { label: string; invalidID: unknown }[] {
    return [
      { label: 'negative', invalidID: faker.number.int({ min: -100, max: -1 }) },
      {
        label: 'float',
        invalidID: faker.number.float({ min: 1.1, max: 100.9, fractionDigits: 1 })
      },
      { label: 'zero', invalidID: 0 },
      { label: 'null', invalidID: null },
      { label: 'alpha', invalidID: faker.string.alpha({ length: 5 }) },
      { label: 'alphanumeric ', invalidID: faker.string.alphanumeric({ length: 10 }) },
      { label: 'symbol', invalidID: faker.string.symbol({ min: 1, max: 5 }) }
    ];
  }
}
