import { TestBed } from '@angular/core/testing';

import { MazeapiService } from './mazeapi.service';

describe('MazeapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MazeapiService = TestBed.get(MazeapiService);
    expect(service).toBeTruthy();
  });
});
