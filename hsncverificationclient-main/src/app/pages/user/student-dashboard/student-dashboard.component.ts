import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ApplicationApi } from '../../../@core/backend/common/api/application.api';
import { ThirdPartyApplicationsApi } from '../../../@core/backend/common/api/thirdPartyApplications.api';
import { FileUploadService } from '../../../@core/backend/common/services/file-upload.service';
import { User, UserData } from '../../../@core/interfaces/common/users';
import { UserStore } from '../../../@core/stores/user.store';
import { NbDialogService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Firstpaymentdialog } from '../../student-verification/payment_dialog/paymentdialog';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
 
  role: any;
  user: User;  
  id:number;
  email:any;
  protected readonly unsubscribe$ = new Subject<void>();

  constructor(private api: ApplicationApi,
    private userStore: UserStore,
    private agentapi: ThirdPartyApplicationsApi,
    private toastrService: NbToastrService,
    private NbDialogService: NbDialogService,
    public fileUploadService: FileUploadService,
    private usersService: UserData,
    private router: Router,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
           
if(this.userStore.getUser() == undefined){


  this.usersService.getCurrentUser().pipe(takeUntil(this.unsubscribe$))
  .subscribe((user) => { 
        this.id=this.user.id;
        this.user = user;
        this.role= user.role;
        this.email = this.user.email;
  })
  
      this.userStore.onUserStateChange()
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe((user: User) => {
        this.id=user.id;
        this.user = user;
        this.role= user.role;
        this.email = this.user.email;
        
      });
    
  }else{
    this.user=this.userStore.getUser();
    this.id=this.user.id;
    this.role=this.user.role;

    if(this.role == 'admin'){
      this.router.navigate(['pages/dashboard']);
    }
    if(this.role == 'agent'){
      this.router.navigate(['pages/agent-dashboard']);
    }
  }
  }//end of ngOninit
}
