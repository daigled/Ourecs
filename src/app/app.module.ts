import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { TagsComponent } from './components/tags/tags.component';
import { AlbumsComponent } from './components/albums/albums.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistsComponent,
    TagsComponent,
    AlbumsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
