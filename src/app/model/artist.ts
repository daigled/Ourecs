import { stringify } from 'querystring';

export class Artist {
    name: string;
    url: string;
    image: string;

    similar?: {artist: Artist[]};
    tags?: {tag: {name: string, url: string}[]};

    constructor (
        name: string,
        url: string,
        image: string,

        similar?: {artist: Artist[]},
        tags?: {tag: {name: string, url: string}[]}
    ) {
        this.name = name;
        this.url = url;
        this.image = image;

        this.similar = similar ? similar : {artist: []};
        this.tags = tags ? tags : {tag: []};
    }
}
