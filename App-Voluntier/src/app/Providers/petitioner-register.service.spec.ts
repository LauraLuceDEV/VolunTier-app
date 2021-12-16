import { TestBed } from '@angular/core/testing';

import { PetitionerRegisterService } from './petitioner-register.service';

describe('PetitionerRegisterService', () => {
  let service: PetitionerRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetitionerRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
