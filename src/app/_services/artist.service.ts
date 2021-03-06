import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Artist } from '../model/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  apiKey = environment.apiKey;
  apiUrl = environment.apiUrl;
  httpOptions: {};

  constructor(private http: HttpClient) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Api-Key': this.apiKey
      })
    }
  }

  urlEscape(text: string): string {
    var regex = /\%20/gi;
    let result = encodeURI(text).replace(regex, '+');
    return result;
  }

  getInfo(artist: string): Promise<{artist: Artist}> {
    return this.http.get<{artist: Artist}>(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${this.urlEscape(artist)}&api_key=${this.apiKey}&format=json`).toPromise();
  }

  getTopArtistsByTag(tag: string, limit: string): Promise<{topartists: {artist: Artist[]}}> {
    return this.http.get<{topartists: {artist: Artist[]}}>(`http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${tag}&api_key=${this.apiKey}&limit=${limit}&format=json`).toPromise();
  }

  getTopAlbums(artist: string, limit: string): Promise<{topalbums: {album: any[]} }> {
    return this.http.get<{topalbums: {album: any[]} }>(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${this.urlEscape(artist)}&api_key=${this.apiKey}&limit=${limit}&format=json`).toPromise();
  }

  addArtist(artist: Artist) {
    return this.http.post<{result: string}>(this.apiUrl+'/artist', artist, this.httpOptions ).toPromise();
  }
}
`