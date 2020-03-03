import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Artist } from '../model/artist';

@Injectable({
  providedIn: 'root'
})
export class AlbumArtService {

  apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  getAlbumArt(mbid: string): Promise<Object> {
    return this.http.get(`https://coverartarchive.org/release/${mbid}`).toPromise()
  }
}
