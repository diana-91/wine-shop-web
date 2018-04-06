import { TestBed, inject } from '@angular/core/testing';

import { Session.ServiceService } from './session.service.service';

describe('Session.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Session.ServiceService]
    });
  });

  it('should be created', inject([Session.ServiceService], (service: Session.ServiceService) => {
    expect(service).toBeTruthy();
  }));
});
