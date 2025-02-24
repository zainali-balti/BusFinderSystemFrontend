import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellingHistoryComponent } from './travelling-history.component';

describe('TravellingHistoryComponent', () => {
  let component: TravellingHistoryComponent;
  let fixture: ComponentFixture<TravellingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravellingHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravellingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
