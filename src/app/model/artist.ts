import { stringify } from 'querystring';

export class Artist {
    name: string;
    albums: string[];
    tags: string[];

    constructor (
        name: string,
        albums?: string[],
        tags?: string[]
    ) {
        this.name = name;
        this.albums = albums ? albums : [];
        this.tags = tags ? tags : [];
    }
}
