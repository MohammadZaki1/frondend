import { Component } from '@angular/core';
import { NbDialogService, NbThemeService } from '@nebular/theme';
import { UserData } from '../../@core/interfaces/common/users';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'help',
    styleUrls: ['./help.component.scss'],
    templateUrl: './help.component.html',
})

export class HelpComponent  {
  protected readonly unsubscribe$ = new Subject<void>();
  user: any;

  constructor(
    private usersService: UserData,
    private router: Router,
  ) {
    this.usersService.getCurrentUser().pipe(takeUntil(this.unsubscribe$))
    .subscribe((user) => { 
      this.user = user;
      if(this.user.is_email_verified == false && this.user.is_otp_verified == false){
        
        this.router.navigate(['auth/logout']);
      }
    })
   }
    
  ngOnInit(){
    
  }

 
}