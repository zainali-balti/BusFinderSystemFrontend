import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleBusServiceComponent } from './people-bus-service.component';

describe('PeopleBusServiceComponent', () => {
  let component: PeopleBusServiceComponent;
  let fixture: ComponentFixture<PeopleBusServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleBusServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleBusServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
