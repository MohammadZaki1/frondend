

import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpRequest } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  NbAuthJWTInterceptor,
  NbAuthModule,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NbTokenLocalStorage,
} from '@nebular/auth';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { AuthPipe } from './auth.pipe';
import { RoleProvider } from './role.provider';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';

import {
  NgxLoginComponent,
  NgxAuthComponent,
  NgxAuthBlockComponent,
  NgxLogoutComponent,
  NgxRegisterComponent,
  NgxRegisterAgentComponent,
  NgxRequestPasswordComponent,
  NgxResetPasswordComponent,
} from './components';

import {
  NbAlertModule,
  NbCardModule,
  NbIconModule,
  NbLayoutModule,
  NbCheckboxModule,
  NbInputModule,
  NbButtonModule,
} from '@nebular/theme';
import { AuthRoutingModule } from './auth-routing.module';
import { ComponentsModule } from '../@components/components.module';
import { authOptions } from './auth.settings';
import { authSettings } from './access.settings';
import { NgxTermsConditionComponent } from './components/registerAgent/terms-condition/terms-condition.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OtpComponent } from './components/otp/otp.component';

const GUARDS = [AuthGuard, AdminGuard];
const PIPES = [AuthPipe];
const COMPONENTS = [
  NgxLoginComponent,
  NgxAuthComponent,
  NgxLogoutComponent,
  NgxRegisterComponent,
  NgxRegisterAgentComponent,
  NgxRequestPasswordComponent,
  NgxResetPasswordComponent,
  NgxAuthBlockComponent,
  NgxTermsConditionComponent,
  OtpComponent,
];

const NB_MODULES = [
  NbIconModule,
  NbLayoutModule,
  NbCardModule,
  NbAlertModule,
  NbCheckboxModule,
  NbInputModule,
  NbButtonModule,
  DialogModule,
  ConfirmDialogModule,
];

export function filterInterceptorRequest(req: HttpRequest<any>): boolean {
  return ['/auth/login', '/auth/sign-up', '/auth/request-pass', '/auth/refresh-token']
    .some(url => req.url.includes(url));
}

@NgModule({
  declarations: [...PIPES, ...COMPONENTS],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    ComponentsModule,
    Ng2TelInputModule,
    FormsModule,
    ...NB_MODULES,
    NbAuthModule.forRoot(authOptions),
    Ng2TelInputModule,
  ],
  exports: [...PIPES],
  providers: [
    NbSecurityModule.forRoot({
      accessControl: authSettings,
    }).providers,
    {
      provide: NbRoleProvider, useClass: RoleProvider,
    },
    {
      provide: NbTokenLocalStorage, useClass: NbTokenLocalStorage,
    },
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: filterInterceptorRequest },
        { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        ...GUARDS],
    };
  }
}
