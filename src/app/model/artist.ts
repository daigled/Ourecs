export class Artist {
    name: string;
    url: string;
    image: string;

    mbid?: string;
    listeners?: number;
    playcount?: number;
    similar?: Artist[];
    tags?: string[];
    bio?: string;

    constructor (
        name: string,
        url: string,
        image: string,

        mbid?: string,
        listeners?: number,
        playcount?: number,
        similar?: Artist[]
    ) {
        this.name = name;
        this.url = url;
        this.image = image;

        this.mbid = mbid ? mbid : null;
        this.listeners = listeners ? listeners : null;
        this.playcount = playcount ? playcount : null;
        this.similar = similar ? similar : null;
    }
}
