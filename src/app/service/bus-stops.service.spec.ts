import { TestBed } from '@angular/core/testing';

import { BusStopsService } from './bus-stops.service';

describe('BusStopsService', () => {
  let service: BusStopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusStopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
