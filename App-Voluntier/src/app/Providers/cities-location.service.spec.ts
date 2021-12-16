import { TestBed } from '@angular/core/testing';

import { CitiesLocationService } from './cities-location.service';

describe('CitiesLocationService', () => {
  let service: CitiesLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitiesLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
