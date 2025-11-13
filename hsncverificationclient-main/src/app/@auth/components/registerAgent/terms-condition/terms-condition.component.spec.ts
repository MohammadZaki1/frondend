import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTermsConditionComponent } from './terms-condition.component';

describe('TermsConditionComponent', () => {
  let component: NgxTermsConditionComponent;
  let fixture: ComponentFixture<NgxTermsConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxTermsConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTermsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
