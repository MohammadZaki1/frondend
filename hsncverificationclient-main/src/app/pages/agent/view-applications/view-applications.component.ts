import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ThirdPartyApplicationsApi } from '../../../@core/backend/common/api/thirdPartyApplications.api';
import { SharedService } from '../../../@core/backend/common/services/shared.service';
import { User, UserData } from '../../../@core/interfaces/common/users';
import { UserStore } from '../../../@core/stores/user.store';
import { NbDialogService } from '@nebular/theme'; 
import { Firstpaymentdialog } from '../../student-verification/payment_dialog/paymentdialog';
import { Subject, Subscription } from 'rxjs';
import { ApplicationApi } from '../../../@core/backend/common/api/application.api';
import { ErrataUpdateComponent } from './errataUpdate/errataUpdate.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-view-application',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.scss']
})
export class ViewApplicationsComponent implements OnInit {
  user_id: any;
  applications: any;
  protected readonly unsubscribe$ = new Subject<void>();
  user: User;
  
  constructor( private api: ThirdPartyApplicationsApi,
    private dialogService: NbDialogService,
    private router: Router,
    private usersService: UserData,
    private activatedRoute:ActivatedRoute) { 
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
    this.user_id = this.activatedRoute.snapshot.paramMap.get('user_id');
    this.getAllApplications();
   
  }

  getAllApplications(): void {
    this.api.getAllApplications(this.user_id).subscribe(data=>{
      this.applications = data['data']
    })
  }

  updateErrata(id,lock_transcript,upload_step){
    this.dialogService.open(ErrataUpdateComponent, {
      context: {
        user_id : this.user_id,
        id : id,
        lock_transcript : lock_transcript,
        upload_step : upload_step
      },
    }).onClose.subscribe(data=>{
      this.getAllApplications();
    });
  }
  
}
