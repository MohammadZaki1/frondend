import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrataDialogComponent } from './errata-dialog.component';

describe('ErrataDialogComponent', () => {
  let component: ErrataDialogComponent;
  let fixture: ComponentFixture<ErrataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrataDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
