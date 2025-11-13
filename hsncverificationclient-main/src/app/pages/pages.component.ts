/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { NbTokenService } from '@nebular/auth';
import { NbMenuItem } from '@nebular/theme';
import { PagesMenu } from './pages-menu';
import { UserStore } from '../@core/stores/user.store';
import { User, UserData } from '../@core/interfaces/common/users';
import { Subject } from 'rxjs';
import { ApplicationApi } from '../@core/backend/common/api/application.api';
// import { id } from '@swimlane/ngx-charts';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu: NbMenuItem[];
  alive: boolean = true;
  protected readonly unsubscribe$ = new Subject<void>();
  user_id: any;
  role: any;
  user: User; 
  paidflag: any;
  local: any;
  id: number;
  constructor(private pagesMenu: PagesMenu,
    private tokenService: NbTokenService,
    private userStore: UserStore,
    private usersService: UserData,
    private api: ApplicationApi
  ) {
    if(this.userStore.getUser() == undefined){
      this.usersService.getCurrentUser().pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        this.user = user;
        this.user_id = user.id            
        this.role= user.role;
        this.initMenu(this.role)   
      })
      this.userStore.onUserStateChange()
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe((user: User) => {
        this.user = user;
        this.role= user.role;
        this.initMenu(this.role)
      });
    }else{
      this.tokenService.tokenChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.user_id = this.userStore.getUser()['id'];
        this.role = this.userStore.getUser()['role'];
        this.initMenu(this.userStore.getUser()['role']);
      });
    }
  }

    initMenu(role) {
      if(role=='admin' || role == 'subAdmin'){
        this.pagesMenu.getMenu(role,'paid')
        .pipe(takeWhile(() => this.alive))
        .subscribe(menu => {
          this.menu = menu;
          if(role == 'subAdmin'){
            this.api.getMenuRole(this.user_id).subscribe(data=>{
              this.menu.forEach(singleMenu=>{
                var result = data['data'].some(d=> d===singleMenu.data.resource);
                if(result == false){
                  singleMenu.hidden = true;
                }
              })
            })
          }
        });
      }else if(role=='student'){
        this.api.applicationdata(this.user_id).subscribe(data => {
          if(data['status'] == 200){
            this.paidflag = 'paid'
            this.pagesMenu.getMenu(role, this.paidflag)
            .pipe(takeWhile(() =>this.alive))
            .subscribe(menu =>{
              this.menu = menu;
            })
          }else {
            this.paidflag = 'unpaid'
            this.pagesMenu.getMenu(role,this.paidflag)
            .pipe(takeWhile(() =>this.alive))
            .subscribe(menu =>{
              this.menu = menu;
            });
          }
        })
    }else if(role=='agent'){
      this.pagesMenu.getMenu(role,'paid')
      .pipe(takeWhile(() =>this.alive))
      .subscribe(menu =>{
        this.menu = menu;
      });
    }
    
  }
  
  ngOnInit(): void {
    this.user_id = this.userStore.getUser()['id'];
  }
}
