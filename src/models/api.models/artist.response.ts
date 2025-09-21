export type ArtistImage = {
    type: 'primary' | 'secondary';
    uri: string;
    resource_url: string;
    uri150: string;
    width: number;
    height: number;
};

export type ArtistAlias = {
    id: number;
    name: string;
    resource_url: string;
};

export type ArtistResponse = {
    name: string;
    id: number;
    resource_url: string;
    uri: string;
    releases_url: string;
    images?: ArtistImage[];
    realname: string;
    profile: string;
    urls: string[];
    namevariations: string[];
    aliases: ArtistAlias[];
    data_quality: string;
};


