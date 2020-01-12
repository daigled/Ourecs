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

  async addNewKnownArtist(artist: Artist) {

    if ( this.artistIsRecommended(artist) ) {
      this.removeRecommendedArtist(artist); // remove artist from list of recommendations once it is added to known artist list
    }

    let alreadyKnown = false;

    this.knownArtists.forEach(ka => {
      if ( ka.name === artist.name) {
        alreadyKnown = true;
      }
    });

    if( !alreadyKnown ) {

      const topAlbums = await (await this.artistService.getTopAlbums(artist.name, "1")).topalbums
      let albumMBIDs = []

      console.log(`${artist.name}'s top Albums`)
      console.log(topAlbums.album);

      topAlbums.album.forEach(a => {
        if( a.mbid ) { albumMBIDs.push(a.mbid); }
      });

      console.log('album MBIDs')
      console.log(albumMBIDs)

      this.knownArtists.push(artist);
      this.handleNewArtistTags(artist);
      this.updateRecommendedArtists(artist.similar.artist);
    }
  }

  handleNewArtistTags(artist: Artist) {
    const newTags = artist.tags.tag;

    newTags.forEach(tag => {
      if ( !this.tagIsKnown(tag.name) ) {
        this.artistTags.push({name: tag.name, weight: 1});
      }
    })
  }

  updateRecommendedArtists(newRecommendations: Artist[]) {
    newRecommendations.forEach(newRec => {

      if ( this.artistIsRecommended(newRec) ) {
        this.increaseRecommendation(newRec);
      } else {
        if ( !this.artistIsKnown(newRec) ) {
          this.recommendedArtists.push({artist: newRec, weight: 1});
        }
      }

    });
  }

  artistIsRecommended(artist: Artist): boolean {
    let alreadyRecommended = false;

    this.recommendedArtists.forEach(rec => {
      if ( rec.artist.name === artist.name ) {
        alreadyRecommended = true;
      }
    })

    return alreadyRecommended;
  }

  artistIsKnown(artist: Artist): boolean {
    let known = false;

    this.knownArtists.forEach(knownArtist => {

      if(knownArtist.name === artist.name) {
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

  tagIsKnown(tag: string): boolean {
    let result = false;


    this.artistTags.forEach(aT => {
      if ( aT.name === tag ) {
        aT.weight++;
        result = true;
      }
    });

    return result;
  }
}
