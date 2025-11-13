/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NB_AUTH_OPTIONS, NbAuthService, NbAuthResult } from '@nebular/auth';
import { getDeepFromObject } from '../../helpers';
import { UserData } from '../../../@core/interfaces/common/users';
import { takeUntil } from 'rxjs/operators';
import { RegisterUserApi } from '../../../@core/backend/common/api/registerUser.api';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
})
export class NgxLogoutComponent implements OnInit {

  redirectDelay: number = this.getConfigValue('forms.logout.redirectDelay');
  strategy: string = this.getConfigValue('forms.logout.strategy');
  protected readonly unsubscribe$ = new Subject<void>();
  user: any;
  
  constructor(protected service: NbAuthService,
    private usersService: UserData,
    private api: RegisterUserApi,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected router: Router) { }

  ngOnInit(): void {
    this.usersService.getCurrentUser().pipe(takeUntil(this.unsubscribe$))
    .subscribe((user) => { 
      this.api.logOutActivity(user.email).subscribe((data)=>{
        this.logout(this.strategy);
      })
    })
  }

  logout(strategy: string): void {
    this.service.logout(strategy).subscribe((result: NbAuthResult) => {
      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl('auth/login');
        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
