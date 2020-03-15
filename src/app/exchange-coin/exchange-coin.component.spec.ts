import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeCoinComponent } from './exchange-coin.component';

describe('ExchangeCoinComponent', () => {
  let component: ExchangeCoinComponent;
  let fixture: ComponentFixture<ExchangeCoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeCoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
