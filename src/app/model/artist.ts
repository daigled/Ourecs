import { stringify } from 'querystring';

export class Artist {
    name: string;
    url: string;
    image: string;

    similar?: {artist: Artist[]};
    tags?: [];

    constructor (
        name: string,
        url: string,
        image: string,

        similar?: {artist: Artist[]},
        tags?: []
    ) {
        this.name = name;
        this.url = url;
        this.image = image;

        this.similar = similar ? similar : {artist: []};
        this.tags = tags ? tags : [];
    }
}
