import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith, takeUntil } from 'rxjs/operators';
import moment, * as _moment from 'moment';
import { Moment } from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { ApplicationApi } from '../../../@core/backend/common/api/application.api';
import { RegisterUserApi } from '../../../@core/backend/common/api/registerUser.api';
import { UserStore } from '../../../@core/stores/user.store';
import { User, UserData } from '../../../@core/interfaces/common/users';
import { Observable, Subject } from 'rxjs';
import { ApplicationProcessApi } from '../../../@core/backend/common/api/applicationProcess.api';
import { MY_FORMATS } from '../../student-application/student-application.component';


@Component({
  selector: 'ngx-edit-edu-details',
  templateUrl: './edit-edu-details.component.html',
  styleUrls: ['./edit-edu-details.component.scss'], providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ConfirmationService
  ]
})
export class EditEduDetailsComponent {
  @Input() editEduDetails;
  errataForm: FormGroup;
  user_id: any;
  role: any;
  user: User;
  patterns = [{ name: 'Annual' }, { name: 'Semester' }]
  courseTypes = [{ type: 'Regular' }, { type: 'External' }]
  resultClasses = [{ name: 'Distinction' }, { name: 'First Class' }, { name: 'Second Class' }, { name: 'Pass Class' }, { name: 'Fail' }, { name: 'ATKT' }];
  grades = [{ name: 'O' }, { name: 'A+' }, { name: 'A' }, { name: 'B+' }, { name: 'B' }, { name: 'C' }, { name: 'D' }, { name: 'F(Fail)' }];
  filteredOptions1: Observable<any[]>[] = [];
  protected readonly unsubscribe$ = new Subject<void>();
  readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  courseData: any;
  today = new Date();
  patternType: any = 'Select ';
  courseDetails: any;
  max = new Date();



  constructor(protected ref: NbDialogRef<EditEduDetailsComponent>,
    private fb: FormBuilder,
    private api: ApplicationApi,
    private toastrService: NbToastrService,
    private userStore: UserStore,
    private usersService: UserData, private processApi: ApplicationProcessApi) { }

  ngOnInit(): void {
    if (this.userStore.getUser() == undefined) {
      this.usersService.getCurrentUser().pipe(takeUntil(this.unsubscribe$))
        .subscribe((user) => {
          this.user = user;
          this.role = user.role;
          this.user_id = this.user.id;
        })
    }
    this.errataForm = this.fb.group({
      id: new FormControl(['']),
      courseName: ['', Validators.required],
      courseType: ['', Validators.required],
      pattern: ['', Validators.required],
      semester: [''],
      seatNo: ['', [Validators.required, Validators.maxLength(10)]],
      sgpi: [''],
      passingMonthYear: ['', Validators.required],
      result: ['', Validators.required],
      grade: ['', Validators.required],
      convocationDate: [''],
      convocationNo: ['']

    }
    )
    this.errataForm.patchValue({
      id: this.editEduDetails.id,
      courseName: this.editEduDetails.courseName,
      courseType: this.editEduDetails.courseType,
      semester: this.editEduDetails.semester,
      seatNo: this.editEduDetails.seatNo,
      sgpi: this.editEduDetails.sgpi,
      passingMonthYear: new Date(this.editEduDetails.passingMonthYear),
      result: this.editEduDetails.resultClass,
      grade: this.editEduDetails.grade,
      convocationDate: new Date(this.editEduDetails.convocationDate),
      convocationNo : this.editEduDetails.convocationNo
    });

    if (this.editEduDetails.semester && this.editEduDetails.semester.startsWith('Semester')) {
      this.errataForm.controls.pattern.setValue('Semester');
    } else {
      this.errataForm.controls.pattern.setValue('Annual');
    }

    this.getCourses('');

    if(this.editEduDetails.type == 'marksheet'){
      this.errataForm.get('semester').setValidators([Validators.required]);
      this.errataForm.get('sgpi').setValidators([Validators.required, Validators.pattern(/^[0-9]*\.?[0-9]+$/)]);
      this.errataForm.get('convocationDate').clearValidators();
      this.errataForm.get('convocationNo').clearValidators();
      this.errataForm.get('convocationDate').updateValueAndValidity();
      this.errataForm.get('convocationNo').updateValueAndValidity();
    }else{
      this.errataForm.get('convocationDate').setValidators([Validators.required]);
      this.errataForm.get('convocationNo').setValidators([Validators.required]);
      this.errataForm.get('semester').clearValidators();
      this.errataForm.get('sgpi').clearValidators();
      this.errataForm.get('semester').updateValueAndValidity();
      this.errataForm.get('sgpi').updateValueAndValidity();
    }


  }
  dismiss() {
    this.ref.close();
  }

  getCourses(college) {
    this.processApi.getCourses(college).subscribe(data => {
      this.courseData = data['data'];
    })
  };

  getCourseDetails(courseName, event) {
    this.patternType = 'Select ';
    if (courseName) {
      this.processApi.getCourseDetails(courseName, event.value).subscribe(data => {
        this.courseDetails = data['data'];
      })
    }
    if (event.value == 'Semester') {
      this.patternType += "Semester";
    } else {
      this.patternType += "Year";
    }
  };

  displayFn(courseName) {
    return courseName ? courseName : '';
  };

  displayFn1(semester) {
    return semester ? semester : '';
  };

  chosenMonthHandler(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = moment(this.errataForm.controls['passingMonthYear'].value);
  
    if (this.editEduDetails.type === 'marksheet') {
      ctrlValue.month(normalizedMonthAndYear.month());
      ctrlValue.year(normalizedMonthAndYear.year());
  
      this.errataForm.controls['passingMonthYear'].setValue(ctrlValue);
      datepicker.close();
    } else if (this.editEduDetails.type === 'degree') {
      ctrlValue.month(normalizedMonthAndYear.month());
      ctrlValue.year(normalizedMonthAndYear.year());
  
      this.errataForm.controls['passingMonthYear'].setValue(ctrlValue);
      datepicker.close();
    }
  };
  



  saveDetails() {
    if (this.errataForm.invalid) {
      this.toastrService.danger("Please fill all data");
    } else {
      this.api.saveEduDetails(this.errataForm.value).subscribe(data => {
        this.toastrService.success("Saved Successfully");
        this.ref.close();
      })
    }



  }
}
