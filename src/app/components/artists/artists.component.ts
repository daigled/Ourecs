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

  artistIsKnown(name: string): boolean {
    this.knownArtists.forEach(artist => {
      if ( artist.name === name ) return true;
    });

    return false;
  }

  artistIsAlreadyRecommended(name: string): boolean {
    this.recommendedArtists.forEach(rec => {
      if ( rec.artist.name === name ) return true;
    });

    return false;
  }

  increaseRecommendation(name: string) {
    this.recommendedArtists.forEach(rec => {
      if ( rec.artist.name === name ) rec.weight++;
    });
  }

  updateKnownArtists(artist: Artist) {

    this.knownArtists.push(artist);
    if ( this.artistIsAlreadyRecommended(artist.name) ) {
      this.recommendedArtists = this.recommendedArtists.filter(rec => {
        return rec.artist.name !== artist.name
      });
    }
    this.updateRecommendedArtists(artist.similar.artist);
    // artist.similar.artist.forEach(artist => {
    //   if( this.artistIsAlreadyRecommended(artist.name) ) {
    //     this.increaseRecommendation(artist.name);
    //   } else {
    //     this.recommendedArtists.push({artist: artist, weight: 1});
    //   }
    // });

  }

  updateRecommendedArtists(artists: Artist[]) {
    artists.forEach(artist => {
      if( this.artistIsAlreadyRecommended(artist.name) ) {
        this.increaseRecommendation(artist.name);
      } else {
        this.recommendedArtists.push({artist: artist, weight: 1});
      }
    });
  }

  updateTags(tags: any[]) {
    tags.forEach(tag => {
      if ( !this.artistTags.includes(tag.name) ) {
        this.artistTags.push({name: tag.name, weight: 1})
      }
    })
  }

  updateRecommendationsBasedOnTags() {
    this.artistTags.forEach(async tag => {
      const limit = tag.weight * 3;
      const topArtistsByTag = await this.artistService.getTopArtistsByTag(tag.name, limit+'');
      console.log(`top artists by tag(${tag.name}): `, topArtistsByTag);

      this.updateRecommendedArtists(topArtistsByTag.topartists.artist);
    });
  }

  async onSubmit() {
    console.log('onSubmit() {')

    const { artistName } = this.artistForm.value;

    const artistInfo = await this.artistService.getInfo(artistName);
    const artistTags = artistInfo.artist.tags.tag;

    this.updateKnownArtists(artistInfo.artist);
    this.updateTags(artistTags);
    this.updateRecommendationsBasedOnTags();

    console.log('}// onSubmit')
  }// onSubmit

}
