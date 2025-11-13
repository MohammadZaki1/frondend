/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NgxAuthComponent,
  NgxLoginComponent,
  NgxRegisterComponent,
  NgxLogoutComponent,
  NgxRequestPasswordComponent,
  NgxResetPasswordComponent,
  NgxRegisterAgentComponent,
} from './components';
import { NgxTermsConditionComponent } from './components/registerAgent/terms-condition/terms-condition.component';
import { OtpComponent } from './components/otp/otp.component';

const routes: Routes = [{
  path: '',
  component: NgxAuthComponent,
  children: [
    {
      path: '',
      component: NgxLoginComponent,
    },
    {
      path: 'login',
      component: NgxLoginComponent,
    },
    {
      path: 'verify-email',
      component: NgxLoginComponent,
    },
    {
      path: 'register',
      component: NgxRegisterComponent,
    },
      
    {
      path: 'TermsConditionComponent',
      component: NgxTermsConditionComponent,
    },
    {
      path: 'otpComponent',
      component: OtpComponent,
    },
    

    {
      path: 'registerAgent',
      component: NgxRegisterAgentComponent,
    },
    {
      path: 'logout',
      component: NgxLogoutComponent,
    },
    {
      path: 'request-password',
      component: NgxRequestPasswordComponent,
    },
    {
      path: 'reset-password',
      component: NgxResetPasswordComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
