import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken } from '@nebular/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {UserData } from '../../@core/interfaces/common/users';
import { UserStore } from '../../@core/stores/user.store';
import { ActivatedRoute} from '@angular/router';
import { ErrataUpdateComponent } from '../agent/view-applications/errataUpdate/errataUpdate.component';
import { NbDialogService } from '@nebular/theme';
import { saveAs } from 'file-saver';
import { ApplicationProcessApi } from '../../@core/backend/common/api/applicationProcess.api';
import { HttpClient } from '@angular/common/http';
import { ApplicationApi } from '../../@core/backend/common/api/application.api';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-myapplication',
  templateUrl: './myapplication.component.html',
  styleUrls: ['./myapplication.component.scss']
})
export class MyapplicationComponent implements OnInit {
  protected readonly unsubscribe$ = new Subject<void>();
  id: any;
  user;
  role: string;
  email: string;
  userid: any;
  status: any;
  applications: any;
  documentdetails: any;
  toastrService: any;
  position: string;
  confirmationService: any;
  authService: any;
  uploadUrl = environment.apiUrl;
  transaction_id;
  application_id;
  payment_amount;
  payment_status;
  payment_date_time;
  user_id;
  enrollment_no;
  order_id;

  currenttoken: NbAuthJWTToken;
  lock_transcript: any;
  //router: any;
  newapp: any;
  editFlag: any;

  constructor(
    private userStore: UserStore,
    private usersService: UserData,
    private api: ApplicationProcessApi, 
    private route:ActivatedRoute,
    private dialogService: NbDialogService,
    private httpClient : HttpClient,
    protected router : Router,
  ) { 
    this.usersService.getCurrentUser().pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => { 
        this.user = user;
        if(this.user.is_email_verified == false && this.user.is_otp_verified == false){
          this.router.navigate(['auth/logout']);
        }
      })
}

  ngOnInit(): void {
    this.newapp = this.route.snapshot.queryParamMap.get('newapp');
    this.editFlag = this.route.snapshot.queryParamMap.get('editFlag');
    this.getAllApplications();
    // this.pdfChallan();
  }

 

    getAllApplications(): void {
     this.api.getAllApplications().subscribe(data=>{
        this.user_id = data['data'][0]['user_id']
        this.applications = data['data']
      })
    }
  
    updateErrata(id,lock_transcript,upload_step,user_id){
      this.dialogService.open(ErrataUpdateComponent, {
        context: {
          user_id : user_id,
          id : id,
          lock_transcript : lock_transcript,
          upload_step : upload_step
        },
      }).onClose.subscribe(data=>{
        this.getAllApplications();
      });
    }


    downloadpdf(app_id,pdfFile){
      if(pdfFile == 'ApplicationForm'){
        this.api.generatepdfform(app_id).subscribe(data=>{
          if(data['status'] == 200){
            this.api.mergedocument(this.user_id,app_id).subscribe(data=>{
              if(data['status'] == 200){

                this.api.downloadpdf(data['data'])
                .subscribe(data => {
                 saveAs(data, data['data']);
                });
              }
            })
          }  
        })
      }else if(pdfFile == 'PaymentReceipt'){
            var fileName = app_id + '_Verification_Payment_Challan.pdf'
            this.api.downloadFiles(fileName)
              .subscribe(data => {
                saveAs(data, fileName); 
              }); 
      }
    }

 

}


