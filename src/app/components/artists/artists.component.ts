import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ArtistService } from 'src/app/_services/artist.service';
import { Artist } from '../../model/artist';
import { AlbumArtService } from 'src/app/_services/album-art.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  artistForm: FormGroup;
  artistTagsForm: FormGroup;
  artistAlbumsForm: FormGroup;

  tagRange: number[];
  // tagCount: number;

  albumRange: number[];
  // albumCount: number;

  constructor(
    private artistService: ArtistService,
    private albumArtService: AlbumArtService
    ) { 

    this.artistTagsForm = new FormGroup({});
    this.artistAlbumsForm = new FormGroup({});

    this.artistForm = new FormGroup({
      artistName: new FormControl(''),
      tags: this.artistTagsForm,
      albums: this.artistAlbumsForm
    });

    this.tagRange = [];
    this.albumRange = [];
  }

  ngOnInit() {
  }

  onSubmit() {

    const { artistName } = this.artistForm.value;
    const artistTags = Object.values(this.artistTagsForm.value) as string[];
    const artistAlbums = Object.values(this.artistAlbumsForm.value) as string[];

    this.artistService.addArtist(new Artist(artistName, artistAlbums, artistTags))
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }// onSubmit

  addTagInput() {
    this.tagRange.push(this.tagRange.length);
    this.artistTagsForm.addControl(""+(this.tagRange.length-1), new FormControl(''));
  }

  addAlbumInput() {
    this.albumRange.push(this.albumRange.length);
    this.artistAlbumsForm.addControl(""+(this.albumRange.length-1), new FormControl(''));
  }

}
