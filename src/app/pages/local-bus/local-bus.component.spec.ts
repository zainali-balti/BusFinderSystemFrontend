import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalBusComponent } from './local-bus.component';

describe('LocalBusComponent', () => {
  let component: LocalBusComponent;
  let fixture: ComponentFixture<LocalBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalBusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
