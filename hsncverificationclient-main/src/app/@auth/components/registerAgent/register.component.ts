/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthSocialLink, NbAuthService, NbAuthResult } from '@nebular/auth';
import { getDeepFromObject } from '../../helpers';
import { Subject } from 'rxjs';
import { InitUserService } from '../../../@theme/services/init-user.service';
import { NgxTermsConditionComponent } from './terms-condition/terms-condition.component';
import { NbDialogService } from '@nebular/theme';
import { RegisterUserApi } from '../../../@core/backend/common/api/registerUser.api';
import { ConfirmationService } from 'primeng/api';
import { OtpComponent } from '../otp/otp.component';

@Component({
  selector: 'ngx-register-agent',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  providers: [ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxRegisterAgentComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  // minLoginLength: number = this.getConfigValue(('forms.validation.fullName.minLength'));
  // maxLoginLength: number = this.getConfigValue(('forms.validation.fullName.maxLength'));
  // minLength: number = this.getConfigValue('forms.validation.password.minLength');
  // maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  // isFullNameRequired: boolean = this.getConfigValue('forms.validation.fullName.required');
  // isEmailRequired: boolean = this.getConfigValue('forms.validation.email.required');
  
  // isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');
  readonly charValidate = /^[.a-zA-Z ]*$/;
  readonly mobileValidate =/^[0-9]\d{5,12}$/;
  readonly panNoValidate =/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/i;
  readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
	readonly passwordValidate = /^[A-Za-z0-9!@#$%^&*()_]{6,}$/;
  readonly gstNoValidate = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i;
  redirectDelay: number = this.getConfigValue('forms.register.redirectDelay');
  showMessages: any = this.getConfigValue('forms.register.showMessages');
  strategy: string = this.getConfigValue('forms.register.strategy');
  socialLinks: NbAuthSocialLink[] = this.getConfigValue('forms.login.socialLinks');

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  registerForm: FormGroup;
  registered: boolean = false;
  checked1: boolean=true;
  checked2: boolean=true;
  checked3: boolean=true;
  checked4: boolean=true;
  defaultCountryCode: boolean;
  countryCode: any;
  mobileInputObj: any;
  checked: boolean;
  emailAlert: boolean;
  country_name: any;
  emailValue: any;
  display: boolean;
  displayNo : boolean=false;
  emailcheck: any;
  emailverify: boolean;
  emailExists: boolean;

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    private fb: FormBuilder,
    protected router: Router,
    private dialogService: NbDialogService,
    private api:RegisterUserApi,
    private ConfirmationService: ConfirmationService,
    protected initUserService: InitUserService) {
  }

  get login() { return this.registerForm.get('fullname'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get terms() { return this.registerForm.get('terms'); }
  get gstno() { return this.registerForm.get('gstno'); }
  get panNo() { return this.registerForm.get('panNo'); }
  ngOnInit(): void {
    // const loginValidators = [
    //   Validators.minLength(this.minLoginLength),
    //   Validators.maxLength(this.maxLoginLength),
    // ];
    // this.isFullNameRequired && loginValidators.push(Validators.required);

    // const emailValidators = [
    //   Validators.pattern(EMAIL_PATTERN),
    // ];
    // this.isEmailRequired && emailValidators.push(Validators.required);

    // const passwordValidators = [
    //   Validators.minLength(this.minLength),
    //   Validators.maxLength(this.maxLength),
    // ];
    // this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.registerForm = this.fb.group({
      fullname:  this.fb.control('', [ Validators.pattern(this.charValidate),Validators.required, Validators.maxLength(70)]),
      email: this.fb.control('', [Validators.required, Validators.pattern(this.emailValidate)]),
      mobile: this.fb.control('',[Validators.required, Validators.pattern(this.mobileValidate)]),
      password: this.fb.control('', [Validators.required, Validators.pattern(this.passwordValidate)]),
      confirmPassword: this.fb.control('', [Validators.required, Validators.pattern(this.passwordValidate)]),
      terms: this.fb.control(''),
      gstno: this.fb.control('',[Validators.pattern(this.gstNoValidate)]),
      panNo: this.fb.control('',[Validators.pattern(this.panNoValidate)]),
    });
  }

  register(): void {
    this.user = this.registerForm.value;
   
    this.errors = this.messages = [];
    this.submitted = true;
    this.user.role="agent";
    this.user.mobile_country_code=this.countryCode
    this.service.register(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      this.displayNo = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
        this.ConfirmationService.confirm({
          message: 'Check your email inbox/spam for email verification and Activate the Account',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: "Okey",
          rejectVisible : false,
          accept: () => {
            const redirect = '/auth/otp';
            if (redirect) {
              // setTimeout(() => {
              //   return this.router.navigateByUrl(redirect);
              // }, this.redirectDelay);
              this.dialogService.open(OtpComponent,{
                context: {
                  user_id : result['token']['accessTokenPayload']['id'],
                  landingPage : redirect,
                  role: this.user.role
                }
              });
            }
          },
          reject: () => {
            

          }
        });
      } else {
        this.errors = result.getErrors();
        alert(this.errors);
      }
     this.cd.detectChanges();
    });
  }

  OnlyNoAllowed(event): boolean {
		const charCode = event.which ? event.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		  return false;
		}
		return true;
	 }

    onCountryChange(details){
      this.defaultCountryCode = true;
      this.countryCode = details.dialCode;
    }

    openTermsPopup(){
      this.displayNo=true;
    }

    onKeyPressNew(event:any){
      this.user = this.registerForm.value;
      this.emailcheck= this.user.email
      this.api.emailValues(this.emailcheck)
      .subscribe(
        (data: any) => {
        if(data['status'] == 400){
          this.emailExists = true;
          this.ConfirmationService.confirm({
            message: 'Your email id is already exists in our database!!! Do you want to login on this website using same id and password??',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              const redirect = '/auth/login';
              if (redirect) {
                setTimeout(() => {
                  return this.router.navigateByUrl(redirect);
                }, this.redirectDelay);
              }
            },
            reject: () => {
            this.emailverify=true

            }
        });


        } else{
          this.emailExists = false;
        }
        err => console.error(err)
      });


    }


    toggle1(condition,checked: boolean) {
      if(condition == 'condition1'){
        this.checked1 = checked;
      }
      if(condition == 'condition2'){
        this.checked2 = checked;
      }
      if(condition == 'condition3'){
        this.checked3 = checked;
      }
      if(condition == 'condition4'){
        this.checked4 = checked;
      }
      
    }


  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  // initUser() {
  //   this.initUserService.initCurrentUser()
  //     .pipe(
  //       takeUntil(this.destroy$),
  //     )
  //     .subscribe();
  // }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  open(){
    this.dialogService.open(NgxTermsConditionComponent).onClose.subscribe(data =>{});
  }
}
