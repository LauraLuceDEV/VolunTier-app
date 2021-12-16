import { TestBed } from '@angular/core/testing';
import { VoluntaryRegisterService } from './voluntary-register.service';

describe('VoluntaryRegisterService', () => {
  let service: VoluntaryRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoluntaryRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
