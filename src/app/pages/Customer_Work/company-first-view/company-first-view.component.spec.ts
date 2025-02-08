import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFirstViewComponent } from './company-first-view.component';

describe('CompanyFirstViewComponent', () => {
  let component: CompanyFirstViewComponent;
  let fixture: ComponentFixture<CompanyFirstViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyFirstViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyFirstViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
