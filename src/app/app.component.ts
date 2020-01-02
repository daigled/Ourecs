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
  title = 'grouptaste';
  // apiKey = environment.apiKey;

  // //artist Info
  knownArtists: Artist[];
  recommendedArtists: {artist: Artist; weight: number}[];

  // //album Info
  // knownAlbums: Album[];
  // recommendedAlbumData: Album[];
  // recommendedAlbums: { album: Album; weight: number }[];

  // //tag Info
  // tags: { tag: string, weight: number}[];
  // tagNames: string[];

  //form controls
  // dataForm = new FormGroup({
  //   artist: new FormControl(''),
  //   album: new FormControl(''),
  // })

  constructor(private http: HttpClient) {
    this.knownArtists = [];
    this.recommendedArtists = [];

    // this.knownAlbums = [];
    // this.recommendedAlbumData = [];
    // this.recommendedAlbums = [];

    // this.tags = [];
    // this.tagNames = [];
  }

  // urlEscape(text: string): string {
  //   var regex = /\%20/gi;
  //   let result = encodeURI(text).replace(regex, '+');
  //   return result;
  // }

  // async onSubmit() {
  //   console.log('onSubmit() {')

  //   let result;

  //   const { artist, album } = this.dataForm.value;
  //   if( artist === "" ) { 
  //     result = "Artist Required...";
  //    }
  //   if( artist !== "" && album === "" ) { 
  //     result = await this.getArtistInfo(artist);
  //     if ( result != null ) this.handleNewArtist(result.artist);
  //   }
  //   if( artist !== "" && album !== "" ) {
  //     result = await this.getAlbumInfo({ name: album, artist: artist } as Album);
  //     if ( result != null ) this.handleNewAlbum(result.album);
  //   }
  //   console.log(result);
  // }// onSubmit

  //Arist handling
  // getArtistInfo(artist: Artist) {
  //   if ( !this.knownArtists.includes(artist) ) {
  //     this.knownArtists.push(artist);

  //     this.recommendedArtists = this.recommendedArtists.filter(rec => rec.artist.name !== artist.name )

  //     return this.http.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${this.urlEscape(artist.name)}&api_key=${this.apiKey}&format=json`).toPromise();
  //   } else {
  //     return null;
  //   }
  // }// getArtistInfo

  // handleNewArtist(artist: any) {

  //   //update tags
  //   this.updateTags(artist.tags);

  //   const similarArtists = artist.similar.artist;
  //   let similarArtistsNames = [];
  //   similarArtists.forEach(sim => {
  //     similarArtistsNames.push(sim.name);
  //   })
  //   this.addNewSimilarArtists(similarArtistsNames);

  // }// handleNewArtist

  // artistIsKnown(artists: Artist[]): boolean {
  //   this.artists.forEach()
  //   return false;
  // }

  // addNewSimilarArtists(newArtists: Artist[]) {

  //   newArtists.forEach( (newArtist, i) => {
  //     if ( this.knownArtists.includes(newArtist) ) {
  //       console.log(`Looks like you already know of ${newArtist}`);
  //     } else {
  //       console.log(`Looks like you haven't heard of ${newArtist}`);
  //       if ( !this.artistIsKnown(newArtist) ) {

  //         // if a new artist isn't already included in the list of recommended artist names, go ahead and add its name to the list of recommended artist names
  //         this.recommendedArtistNames.push(newArtist);

  //         // add it to the recommended artists list top, with a weight of 1
  //         this.recommendedArtists.push( {name: newArtist, weight: 1} );

  //       } else {

  //         //if a new artist is already included in the list of recommended artist names, just increase its weight in the list of recommended artists
  //         this.recommendedArtists.forEach( (recommendedArtist, j) => {
  //           if ( recommendedArtist.name ===  newArtist ) {
  //             this.recommendedArtists[j].weight++;
  //           }
  //         });

  //       }
  //     }
  //   });

  // }// addNewSimilarArtists


  // //Album handling
  // getAlbumInfo(album: Album) {
  //   if ( !this.knownAlbums.includes(album) ) {
  //     this.knownAlbums.push(album);

  //     this.recommendedAlbums = this.recommendedAlbums.filter(rec => rec.album !== album);

  //     return this.http.get(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${this.apiKey}&artist=${album.artist}&album=${album.name}&format=json`).toPromise();
  //   } else {
  //     return null;
  //   }
  // }// getAlbumInfo

  // async handleNewAlbum(album: any) {

  //   // update tags
  //   this.updateTags(album.tags);

  //   // similar albums aren't included in album objects returned from the API...
  //   console.log('this album\'s artist is: ', album.artist);
  //   let artistInfo = await this.getArtistInfo(album.artist);
  //   console.log('the returned artist: ');
  //   console.log(artistInfo);

  //   const similarArtists = artistInfo["artist"]["similar"].artist;
  //   let similarArtistsNames = [];
  //   similarArtists.forEach(sim => {
  //     similarArtistsNames.push(sim.name);
  //   })
  //   this.addNewSimilarArtists(similarArtistsNames);

  // }// handleNewAlbum

  // updateTags(tags: any) {
  //   console.log('updateTags() {');
  //   tags.tag.map(t => t.name ).forEach(tagName => {
  //     if( this.tagNames.includes(tagName) ) {
  //       this.tags.forEach(tag => {
  //         if(tag.tag === tagName) {
  //           tag.weight++;
  //         }
  //       });
  //     } else {
  //       this.tagNames.push(tagName);
  //       this.tags.push({tag: tagName, weight: 1})
  //     }
  //   });
  // }

  


  
  

  
}
