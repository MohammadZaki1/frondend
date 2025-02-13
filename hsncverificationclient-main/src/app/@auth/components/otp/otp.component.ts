import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { RegisterUserApi } from '../../../@core/backend/common/api/registerUser.api';
import { takeUntil } from 'rxjs/operators';
import { InitUserService } from '../../../@theme/services/init-user.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  @Input() role;
  @Input() user_id;
  @Input() landingPage;
  otp;
  enterOtp;
  private destroy$: Subject<void> = new Subject<void>();
  otpValidation: boolean;

  constructor(protected ref: NbDialogRef<OtpComponent>,
    protected initUserService: InitUserService,
    private api:RegisterUserApi,
    protected router: Router,) { }

  ngOnInit() {
    this.api.sendOtp(this.user_id).subscribe(data=>{
      if(data['status'] == 200){
        //this.otp = data['data']
      }
    })
  }

  cancel(){
    this.router.navigate(['auth/logout']);
    this.ref.close();
  }


  resendOtp(){
    if(this.role == "admin" || this.role == "subAdmin"){
      this.api.sendOtp(this.user_id).subscribe(data=>{
        if(data['status'] == 200){
          //this.otp = data['data']
        }
      })
    }
  }
  verify(){
    this.enterOtp = (document.getElementById('enterOtp') as HTMLInputElement).value;
    this.api.updateOtp(this.user_id,this.enterOtp).subscribe(data=>{         
      if(data['status'] == 200){
        if(data['data'].is_otp_verified == 1 || data['data'].is_email_verified == 1){
          this.initUserService.initCurrentUser(data['data'].id,data['data'].user_type,data['data'].email,data['data'].firstname,
          data['data'].lastname,data['data'].mobile,data['data'].is_email_verified,data['data'].is_otp_verified)
          .pipe(
            takeUntil(this.destroy$),
          )
          .subscribe();
          this.router.navigateByUrl(this.landingPage);
        }
      }else{
        this.otpValidation = false;
        
      }
    })       
    
  }

}
