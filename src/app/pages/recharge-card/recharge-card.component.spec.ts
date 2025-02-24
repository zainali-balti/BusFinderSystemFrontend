import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeCardComponent } from './recharge-card.component';

describe('RechargeCardComponent', () => {
  let component: RechargeCardComponent;
  let fixture: ComponentFixture<RechargeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechargeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechargeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
