import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsDetailsComponent } from './edit-ins-details.component';

describe('EditInsDetailsComponent', () => {
  let component: EditInsDetailsComponent;
  let fixture: ComponentFixture<EditInsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
