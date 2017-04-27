import { TestBed, inject } from '@angular/core/testing';

import { WineService } from './wine.service';

describe('WineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WineService]
    });
  });

  it('should ...', inject([WineService], (service: WineService) => {
    expect(service).toBeTruthy();
  }));
});
