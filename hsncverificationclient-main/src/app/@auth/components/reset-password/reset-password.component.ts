/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthService, NbAuthResult } from '@nebular/auth';
import { getDeepFromObject } from '../../helpers';
import { NbToastrService} from '@nebular/theme';
import { ApplicationProcessApi } from '../../../@core/backend/common/api/applicationProcess.api';


@Component({
  selector: 'ngx-reset-password-page',
  styleUrls: ['./reset-password.component.scss'],
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxResetPasswordComponent implements OnInit {
  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  redirectDelay: number = this.getConfigValue('forms.resetPassword.redirectDelay');
  showMessages: any = this.getConfigValue('forms.resetPassword.showMessages');
  strategy: string = this.getConfigValue('forms.resetPassword.strategy');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');

  validation_messages;
  alertflag = 0;
  messagealertflag=0;

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  resetPasswordForm: FormGroup;
  email: any;

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected fb: FormBuilder,
    protected router: Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private api: ApplicationProcessApi) { }

  ngOnInit(): void {
    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.resetPasswordForm = this.fb.group({
      password: this.fb.control('', [...passwordValidators]),
      confirmPassword: this.fb.control('', [...passwordValidators]),
    });
    this.email = this.route.snapshot.queryParamMap.get('email');

  }

  get password() { return this.resetPasswordForm.get('password'); }
  get confirmPassword() { return this.resetPasswordForm.get('confirmPassword'); }

  resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;
    this.user = this.resetPasswordForm.value;
    this.email=this.route.snapshot.queryParamMap.get('email')

    this.service.resetPassword(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

  onSubmit(){
    // this.resetPasswordForm.controls.password.markAsDirty();
    // this.resetPasswordForm.controls.repasswordCtrl.markAsDirty();

    var userPassword= this.resetPasswordForm.controls.password.value;
    var userConfirmPassword= this.resetPasswordForm.controls.confirmPassword.value;


    if(userPassword =='' || userConfirmPassword ==''){
      this.alertflag = 1;
      this.validation_messages =  "Your form is not filled please fill completely";

    }else if (!(userPassword == userConfirmPassword)){
          this.alertflag = 2;
          this.validation_messages =  "Password doesn't match!";
    }
    else{
        if(userPassword.length<6 && userConfirmPassword.length<6){
            this.alertflag = 4;
            this.validation_messages =  "Use 6 or more characters,numbers or symbols ";
        }else{
            
            var resetPasswordvalue={
                userPassword:this.resetPasswordForm.controls.password.value,
                userConfirmPassword:this.resetPasswordForm.controls.confirmPassword.value,
                email:this.email
            }

            
            this.alertflag = 5;
            this.validation_messages =  "Your password and confirm password successfully match";

            this.api.resetPasswordValues(resetPasswordvalue)
            .subscribe((data: any) => {
                if(data['status'] == 200){
                  this.toastrService.show(
                    `Password Reset Successfully ! `,
                );
                this.messagealertflag = 1;
                this.alertflag = 0;                  
                this.router.navigate(['auth/login']);
                }else if(data['status'] ==400){
                this.messagealertflag = 0; 
                }else{

                }
                err => console.error(err)
            });
        }
    }
}

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
