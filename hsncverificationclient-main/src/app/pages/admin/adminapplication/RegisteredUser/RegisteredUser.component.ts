
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { RegisterUserApi } from '../../../../@core/backend/common/api/registerUser.api';

@Component({
  selector: 'registereduser',
  styleUrls: ['./RegisteredUser.component.scss'],
  template: `
    <nb-card>

    <nb-card-header  *ngIf=flagApp>Sorry No Data <br>  No Applications found</nb-card-header>
  
      <nb-card-body>
       
        
        <div class="Rtable Rtable--5cols Rtable--collapse" *ngIf="registerUser?.length > 0" >
            <div class="Rtable-row Rtable-row--head">
              <div class="Rtable-cell date-cell column-heading">ID</div>
              <div class="Rtable-cell date-cell column-heading">Name</div>
              <div class="Rtable-cell date-cell column-heading">Email</div>
              <div class="Rtable-cell date-cell column-heading">Role</div>
            </div>

            <nb-list>
                        <nb-list-item class="Rtable-row is-striped" *ngFor="let data of registerUser;let i=index;">
                            <div class="Rtable-cell date-cell">
                                <div class="Rtable-cell--heading">Sr.No.</div>
                                <div class="Rtable-cell--content date-content"><b>{{i+1}}</b></div>
                            </div>
                          
                            <div class="Rtable-cell date-cell">
                                <div class="Rtable-cell--heading">Name</div>
                                <div class="Rtable-cell--content date-content">{{ data?.name}}</div>
                            </div>

                            <div class="Rtable-cell date-cell">
                                <div class="Rtable-cell--heading">Email</div>
                                <div class="Rtable-cell--content date-content">{{ data?.email}}</div>
                            </div>

                            <div class="Rtable-cell date-cell">
                                <div class="Rtable-cell--heading">role</div>
                                <div class="Rtable-cell--content date-content">{{ data?.role}}</div>
                            </div>
                            
                        </nb-list-item>
                    </nb-list>
              
        </div> 
      </nb-card-body>
    </nb-card>`
})
export class RegisteredUserComponent {
  user_id;
  role;
  registerUser: any;
  flagApp:boolean=false
  userApplication: any;
  constructor(private router: Router,
              private api: RegisterUserApi,
    ) {

  }
  ngOnInit() {
  
    this.api.getRegisterUser().subscribe(data=>{
      this.registerUser=data['data']
      if(this.registerUser!=null){
        this.flagApp=false;
      }else{
        this.flagApp=true;
      }
    })

  }

  redirect() {
    this.router.navigateByUrl('/pages/dashboard');
  }






}