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
import { ConfirmationService } from 'primeng/api';
import { RegisterUserApi } from '../../../@core/backend/common/api/registerUser.api';
import { OtpComponent } from '../otp/otp.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  providers: [ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxRegisterComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  // minmobileLength:number = 10;
  // maxmobileLength:number = 10;

  // minfirstNameLength:number = 2;
  // maxfirstNameLength:number = 20;

  // minlastNameLength:number = 2;
  // maxlastNameLength:number = 20;
  // minLoginLength: number = this.getConfigValue(('forms.validation.fullName.minLength'));
  // maxLoginLength: number = this.getConfigValue(('forms.validation.fullName.maxLength'));
  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  isFullNameRequired: boolean = this.getConfigValue('forms.validation.fullName.required');
  isEmailRequired: boolean = this.getConfigValue('forms.validation.email.required');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');
  redirectDelay: number = this.getConfigValue('forms.register.redirectDelay');
  showMessages: any = this.getConfigValue('forms.register.showMessages');
  strategy: string = this.getConfigValue('forms.register.strategy');
  socialLinks: NbAuthSocialLink[] = this.getConfigValue('forms.login.socialLinks');

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  registerForm: FormGroup;
  isMobileRequired: number;
  isLastNameRequired: number;
  readonly charValidate = /^[.a-zA-Z ]*$/;
  readonly mobileValidate =/^[0-9]\d{5,12}$/;
  readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
	readonly passwordValidate = /^[A-Za-z0-9!@#$%^&*()_]{6,}$/;
  defaultCountryCode: boolean;
  countryCode: any;
  mobileInputObj: any;
  checked: boolean;
  emailAlert: boolean;
  emailValue: any;
  display: boolean;
  displayNo : boolean=false;
  emailcheck: any;
  emailverify: boolean;
  checked1: boolean=true;
  checked2: boolean=true;
  checked3: boolean=true;
  checked4: boolean=true;
  country_name: any;
  registered: boolean = false;
  emailExists: boolean;

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    private fb: FormBuilder,
    protected router: Router,
    protected initUserService: InitUserService,
    private api:RegisterUserApi,
    private dialogService: NbDialogService,
    private ConfirmationService: ConfirmationService,) {
  }
  get firstName() { return this.registerForm.get('firstName');}
  get lastName() { return this.registerForm.get('lastName');}
  get fullName() { return this.registerForm.get('fullName'); }
  get email() { return this.registerForm.get('email'); }
  get mobile() {return this.registerForm.get('mobile');}
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get terms() { return this.registerForm.get('terms'); }

  ngOnInit(): void {

    this.api.getIpAddress().subscribe(data => {
			// this.country_name = data['country'];
			// if(data.country=='India'){
			this.country_name = data['country_name'];
			if(this.country_name=='India'){
				this.registerForm.controls.currentlocation.patchValue("WITHIN");
			}else{
				this.registerForm.controls.currentlocation.patchValue("OUTSIDE");
			}
		});

    this.registerForm = this.fb.group({
      firstName: this.fb.control('', [ Validators.pattern(this.charValidate),Validators.required, Validators.maxLength(70)]),
      lastName: this.fb.control('',[Validators.pattern(this.charValidate), Validators.required, Validators.maxLength(70),Validators.minLength(2)]),
      fullname:this.fb.control('',[Validators.required]),
      mobile: this.fb.control('',[Validators.required, Validators.pattern(this.mobileValidate)]),
      email: this.fb.control('', [Validators.required, Validators.pattern(this.emailValidate)]),
      password: this.fb.control('', [Validators.required, Validators.pattern(this.passwordValidate)]),
      confirmPassword: this.fb.control('', [Validators.required, Validators.pattern(this.passwordValidate)]),
      currentlocation: this.fb.control(''),
      terms: this.fb.control(''),
    });
  }

  register(): void {
    this.user = this.registerForm.value;
    this.errors = this.messages = [];
    this.submitted = true;
    this.user.role="student";
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
          }
        });
      } else {
        
      }

     // const redirect = result.getRedirect();
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
      if(condition=='condition1')
      {
        this.checked1=checked
      }else if(condition=='condition2'){
        this.checked2=checked
      }else if(condition=='condition3'){
        this.checked3=checked
      }else if(condition=='condition4'){
        this.checked4=checked
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
}
