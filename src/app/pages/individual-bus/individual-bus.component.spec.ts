import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualBusComponent } from './individual-bus.component';

describe('IndividualBusComponent', () => {
  let component: IndividualBusComponent;
  let fixture: ComponentFixture<IndividualBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualBusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
