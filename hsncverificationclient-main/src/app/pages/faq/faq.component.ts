import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../@core/interfaces/common/users';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
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

  ngOnInit(): void {
  }
  redirect() {
    this.router.navigateByUrl('/pages/student-verification');
  }

}
