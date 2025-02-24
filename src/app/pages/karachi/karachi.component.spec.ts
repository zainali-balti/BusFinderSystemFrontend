import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarachiComponent } from './karachi.component';

describe('KarachiComponent', () => {
  let component: KarachiComponent;
  let fixture: ComponentFixture<KarachiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KarachiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KarachiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
