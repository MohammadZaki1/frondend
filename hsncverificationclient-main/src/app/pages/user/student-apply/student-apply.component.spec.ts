import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentApplyComponent } from './student-apply.component';



describe('StudentApplyComponent', () => {
  let component: StudentApplyComponent;
  let fixture: ComponentFixture<StudentApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentApplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
