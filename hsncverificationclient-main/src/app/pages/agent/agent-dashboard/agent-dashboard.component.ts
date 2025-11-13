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
  selector: 'ngx-agent-dashboard',
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.scss']
})
export class AgentDashboardComponent implements OnInit {
 
  role: any;
  user: User;  
  id:number;
  email:any;
  protected readonly unsubscribe$ = new Subject<void>();


  constructor(
    public fileUploadService: FileUploadService,
    private usersService: UserData,
    private router: Router,
    private fb: FormBuilder,) { 
      this.usersService.getCurrentUser().pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        this.user = user;
        if(this.user.is_email_verified == true && this.user.is_otp_verified == true){
          if(this.user.role != 'agent'){
            this.router.navigate(['auth/logout']);
          }
        }else{
          this.router.navigate(['auth/logout']);
        }
      })
    }

  ngOnInit(): void {
  
  }

  dashboardRoutes(){
    this.router.navigate(['pages/listAgentApplication']);
  }

}
