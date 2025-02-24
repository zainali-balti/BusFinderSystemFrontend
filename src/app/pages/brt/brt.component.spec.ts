import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrtComponent } from './brt.component';

describe('BrtComponent', () => {
  let component: BrtComponent;
  let fixture: ComponentFixture<BrtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
