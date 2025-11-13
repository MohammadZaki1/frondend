/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NB_AUTH_OPTIONS,
  NbAuthSocialLink,
  NbAuthService,
  NbAuthResult,
} from '@nebular/auth';
import { getDeepFromObject } from '../../helpers';
import { EMAIL_PATTERN } from '../constants';
import { InitUserService } from '../../../@theme/services/init-user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService,NbThemeService, NbDialogService  } from '@nebular/theme';
import { OtpComponent } from '../otp/otp.component';
import { ApplicationProcessApi } from '../../../@core/backend/common/api/applicationProcess.api';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NgxLoginComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  redirectDelay: number = this.getConfigValue('forms.login.redirectDelay');
  showMessages: any = this.getConfigValue('forms.login.showMessages');
  strategy: string = this.getConfigValue('forms.login.strategy');
  socialLinks: NbAuthSocialLink[] = this.getConfigValue('forms.login.socialLinks');
  rememberMe = this.getConfigValue('forms.login.rememberMe');
  isEmailRequired: boolean = this.getConfigValue('forms.validation.email.required');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  loginForm: FormGroup;
  alive: boolean = true;
  logicalPositions = NbGlobalLogicalPosition;
  verify_message = false;
  messageHeading: string;
  message: string;
  outln: string;
  token: any;
  id: any;
  landingPage: any;
  role: any;



  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected themeService: NbThemeService,
    private fb: FormBuilder,
    protected router: Router,
    private route: ActivatedRoute,
    protected initUserService: InitUserService,
    private toasterService: NbToastrService,
    private dialogService: NbDialogService,
    private api: ApplicationProcessApi
    ) { }


    // ngOnInit(): void {
    //   var verify = this.route.snapshot.queryParamMap.get('verify');
    //   if(verify == '1'){
    //     this.verify_message = true;
    //   }
    //   const emailValidators = [
    //     Validators.pattern(EMAIL_PATTERN),
    //   ];
    //   this.isEmailRequired && emailValidators.push(Validators.required);
  
    //   const passwordValidators = [
    //     Validators.minLength(this.minLength),
    //     Validators.maxLength(this.maxLength),
    //   ];
    //   this.isPasswordRequired && passwordValidators.push(Validators.required);
  
    //   this.loginForm = this.fb.group({
    //     email: this.fb.control('', [...emailValidators]),
    //     password: this.fb.control('', [...passwordValidators]),
    //     rememberMe: this.fb.control(false),
    //   });
    // }



  ngOnInit(): void {
    var verify = this.route.snapshot.queryParamMap.get('verify');
     this.token = this.route.snapshot.queryParamMap.get('token');
    if(verify == '1'){
      this.verify_message = true;
      this.messageHeading = "Hooray";
      this.message = "Your Email is verified. Kindly login now.";
      this.outln = 'success';
    }
    const emailValidators = [
      Validators.pattern(EMAIL_PATTERN),
    ];
    this.isEmailRequired && emailValidators.push(Validators.required);

    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.loginForm = this.fb.group({
      email: this.fb.control('', [...emailValidators]),
      password: this.fb.control('', [...passwordValidators]),
      rememberMe: this.fb.control(false),
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
      if(event.key == 'Enter'){
      this.login();
    }
  }

  login(): void {
    this.verify_message = false;
    this.user = this.loginForm.value;
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
       var id=result['token']['accessTokenPayload']['id'];
       var role =result['token']['accessTokenPayload']['role'];
       var email =result['token']['accessTokenPayload']['email'];
       var otp_verified = result['token']['accessTokenPayload']['is_otp_verified'];
       var email_verified = result['token']['accessTokenPayload']['is_email_verified'];
       var firstname = result['token']['accessTokenPayload']['firstname'];
       var lastname = result['token']['accessTokenPayload']['lastname'];
       var mobile = result['token']['accessTokenPayload']['mobile'];
       var landingPage = result['token']['accessTokenPayload']['landingPage'];
       var is_email_verified = result['token']['accessTokenPayload']['is_email_verified'];
       var is_otp_verified = result['token']['accessTokenPayload']['is_otp_verified'];
      } else {
        if(result['response'].status == 402){
          this.verify_message = true;
          this.messageHeading = "Sorry";
          this.message = result['response'].error.error;
          this.outln = 'danger';
        }else{
          this.errors = result.getErrors();
        }
      }
      
      const redirect = result.getRedirect();
      if (redirect) {
        if(role == 'student' || role == 'agent'){
          if(otp_verified == 1 || email_verified == 1){
            this.initUser(id,role,email,firstname,lastname,mobile,is_email_verified,is_otp_verified);
            return this.router.navigateByUrl(redirect);
          }else{
            if(this.errors.length == 0 && result['response'].status != 402){
              this.verify_message = true;
              this.messageHeading = "Sorry";
              this.message = result['response'].error.error;
              this.outln = 'danger';
              this.id = id;
              this.landingPage = landingPage;
              this.role = role;
              this.toasterService.danger("Please verify your email",'Error',)
            }else{
              this.toasterService.danger(this.errors,'Error',)
            }
            return this.router.navigateByUrl('/auth/login');
          }
        }else{
          this.dialogService.open(OtpComponent,{
            context: {
              user_id : id,
              landingPage : landingPage,
              role : role
            }
          });
        }
      
    }else{
      if(this.errors.length == 0 && result['response'].status != 402){
        this.toasterService.danger("Please verify your email",'Error',)
      }else{
        this.toasterService.danger(this.errors,'Error',)
      }
      return this.router.navigateByUrl('/auth/login');
    }
      this.cd.detectChanges();
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  initUser(id,role,email,firstname,lastname,mobile,is_email_verified,is_otp_verified) {
    this.initUserService.initCurrentUser(id,role,email,firstname,lastname,mobile,is_email_verified,is_otp_verified)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  verifyemail(){
    this.dialogService.open(OtpComponent,{
      context: {
        user_id : this.id,
        landingPage : this.landingPage,
        role : this.role
      }
    });
  }
}
