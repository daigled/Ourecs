import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ArtistService } from 'src/app/service/artist.service';
import { Artist } from '../../model/artist';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  knownArtists: Artist[];
  recommendedArtists: {artist: Artist; weight: number}[];
  artistTags: {name: string; weight: number}[];

  artistForm: FormGroup;

  constructor(private artistService: ArtistService) { 

    this.knownArtists = [];
    this.recommendedArtists = [];
    this.artistTags = [];

    this.artistForm = new FormGroup({
      artistName: new FormControl('')
    });
  }

  ngOnInit() {
  }

  async onSubmit() {

    const { artistName } = this.artistForm.value;

    const artistInfo = await this.artistService.getInfo(artistName);
    const artistTags = artistInfo.artist.tags;

    this.addNewKnownArtist(artistInfo.artist);

  }// onSubmit

  addNewKnownArtist(artist: Artist) {

    if ( this.isRecommended(artist) ) {
      this.removeRecommendedArtist(artist); // remove artist from list of recommendations once it is added to known artist list
    }

    let alreadyKnown = false;

    this.knownArtists.forEach(ka => {
      if ( ka.name === artist.name) {
        alreadyKnown = true;
      }
    });

    if( !alreadyKnown ) {
      this.knownArtists.push(artist);
      this.updateRecommendedArtists(artist.similar.artist);
    }
  }

  updateRecommendedArtists(newRecommendations: Artist[]) {
    newRecommendations.forEach(newRec => {

      if ( this.isRecommended(newRec) ) {
        this.increaseRecommendation(newRec);
      } else {
        if ( !this.isKnown(newRec) ) {
          this.recommendedArtists.push({artist: newRec, weight: 1});
        }
      }

    });
  }

  isRecommended(artist: Artist): boolean {
    let alreadyRecommended = false;

    this.recommendedArtists.forEach(rec => {
      if ( rec.artist.name === artist.name ) {
        console.log(`${artist.name} is already a recommended artist`);
        alreadyRecommended = true;
      }
    })

    return alreadyRecommended;
  }

  isKnown(artist: Artist): boolean {
    let known = false;

    this.knownArtists.forEach(knownArtist => {

      if(knownArtist.name === artist.name) {
        console.log(`${artist.name} is already a known artist`);
        known = true;
      }
    });

    return known;
  }

  increaseRecommendation(artist: Artist) {
    this.recommendedArtists.forEach(rec => {
      if ( rec.artist.name === artist.name ) rec.weight++;
    })
  }

  removeRecommendedArtist(artist: Artist) {
    this.recommendedArtists = this.recommendedArtists.filter(rec => {
      return artist.name !== rec.artist.name;
    })
  }
}
