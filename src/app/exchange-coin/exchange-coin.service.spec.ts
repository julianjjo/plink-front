import { TestBed } from '@angular/core/testing';

import { ExchangeCoinService } from './exchange-coin.service';

describe('ExchangeCoinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExchangeCoinService = TestBed.get(ExchangeCoinService);
    expect(service).toBeTruthy();
  });
});
