import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApplicationApi } from '../../../@core/backend/common/api/application.api';
import { NbToastrService } from '@nebular/theme';
import { UserData } from '../../../@core/interfaces/common/users';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-student-feedback',
  templateUrl: './student-feedback.component.html',
  styleUrls: ['./student-feedback.component.scss']
})
export class StudentFeedbackComponent implements OnInit {
  studentFeedbacks: any;
  p: number = 1;
  protected readonly unsubscribe$ = new Subject<void>();

  admin:any;
  constructor(
    private api: ApplicationApi,
    public toasterService: NbToastrService,
    private usersService: UserData,
    private router : Router,

  ) {
    this.usersService.getCurrentUser().pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        this.admin = user;
        if(this.admin.is_email_verified == true && this.admin.is_otp_verified == true){
          if(this.admin.role != 'admin'  && this.admin.role != 'subAdmin'){
            this.router.navigate(['auth/logout']);
          }
        }else{
          this.router.navigate(['auth/logout']);
        }
      })
  }

  ngOnInit() {
    this.getStudentFeedback();
  }

  getStudentFeedback(){
    this.api.getallstudentfeedback(this.p).subscribe((data)=>{
      this.studentFeedbacks = data['data'];
    })
  }

  pageChanged(event){
    this.p = event;
    this.getStudentFeedback();
  }

}
