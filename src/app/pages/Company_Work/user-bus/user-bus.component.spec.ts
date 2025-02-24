import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBusComponent } from './user-bus.component';

describe('UserBusComponent', () => {
  let component: UserBusComponent;
  let fixture: ComponentFixture<UserBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
