export type LabelResponse = {
    id: number;
    name: string;
    profile: string;
    contact_info: string;
    uri: string;
    resource_url: string;
    releases_url: string;
    data_quality: string;
  
    sublabels: {
      id: number;
      name: string;
      resource_url: string;
    }[];
  
    urls: string[];
  
    images: {
      type: string;
      uri: string;
      resource_url: string;
      uri150: string;
      width: number;
      height: number;
    }[];
  };
  