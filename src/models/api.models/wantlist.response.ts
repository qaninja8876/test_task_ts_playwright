export type WantlistResponse = {
  pagination: {
    per_page: number;
    pages: number;
    page: number;
    items: number;
    urls: Record<string, string>;
  };
  wants: Array<{
    rating: number;
    basic_information: {
      formats: Array<{
        text?: string;
        qty: string;
        descriptions: string[];
        name: string;
      }>;
      thumb: string;
      cover_image: string;
      title: string;
      labels: Array<{
        resource_url: string;
        entity_type: string;
        catno: string;
        id: number;
        name: string;
      }>;
      year: number;
      artists: Array<{
        join: string;
        name: string;
        anv: string;
        tracks: string;
        role: string;
        resource_url: string;
        id: number;
      }>;
      resource_url: string;
      id: number;
    };
    notes?: string;
    resource_url: string;
    id: number;
  }>;
};
