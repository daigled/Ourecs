import { TestBed } from '@angular/core/testing';

import { AlbumArtService } from './album-art.service';

describe('AlbumArtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumArtService = TestBed.get(AlbumArtService);
    expect(service).toBeTruthy();
  });
});
