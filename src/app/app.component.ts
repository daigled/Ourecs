import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Artist } from './model/artist';
import { Album } from './model/album';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ourecs';

  //artist Info
  knownArtists: Artist[];
  recommendedArtists: {artist: Artist; weight: number}[];


  constructor(private http: HttpClient) {
    this.knownArtists = [];
    this.recommendedArtists = [];
  }
  
}
