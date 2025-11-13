import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEduDetailsComponent } from './edit-edu-details.component';

describe('EditEduDetailsComponent', () => {
  let component: EditEduDetailsComponent;
  let fixture: ComponentFixture<EditEduDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEduDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEduDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
