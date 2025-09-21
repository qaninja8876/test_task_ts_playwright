import { faker } from '@faker-js/faker';
import { ReleaseResponse } from '../../models/api.models/release.response';

export class UIDataHelper {
  static generateUnknownCredentials(): { username: string; password: string } {
    return {
      username: faker.internet.username(),
      password: faker.internet.password({ length: 9 })
    };
  }

  static convertReleaseInfo(release: ReleaseResponse) {
    const label = release.labels.map(label => `${label.name} – ${label.catno}`).join(', ');

    const formatParts = release.formats.map(f => [f.name, ...f.descriptions]).flat();
    const year = release.year.toString();

    const genre = release.genres.join(', ');
    const style = release.styles.join(', ');

    return {
      title: release.title,
      artist: release.artists[0].name,
      label,
      country: release.country,
      formatParts,
      year,
      genre,
      style
    };
  }
}
