
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { ApplicationApi } from '../../../../@core/backend/common/api/application.api';
import { UserStore } from '../../../../@core/stores/user.store';

@Component({
  selector: 'paidapplication',
  styleUrls: ['./PaidApplication.component.scss'],
  template: `
 <nb-card *ngIf=flagApp>
  <nb-card-header>Sorry No Data</nb-card-header>
  <nb-card-body>
    No Applications found   
</nb-card-body>
  <nb-card-footer></nb-card-footer>
</nb-card>
      <nb-card size="giant" *ngIf=!flagApp>
        <nb-card-header>
        <div  (click)="redirect()">
        <i title="Back To Dashboard" class="fas fa-arrow-left fa-2x fa-pull-right fa-border"></i>
      </div>
        </nb-card-header>
        <nb-card-body>
        <div class="Rtable Rtable--5cols Rtable--collapse" *ngIf="userProcessedApplication?.length">
                                <div class="Rtable-row Rtable-row--head">
                                    <div class="Rtable-cell date-cell column-heading">Application ID</div>
                                    <div class="Rtable-cell date-cell column-heading">Name</div>
                                    <div class="Rtable-cell date-cell column-heading">Seat No.</div>
                                    <div class="Rtable-cell date-cell column-heading">Passing Year</div>
                                    <div class="Rtable-cell date-cell column-heading">Stream</div>
                                    <div class="Rtable-cell date-cell column-heading">Branch</div>
                                    <div class="Rtable-cell date-cell column-heading">Semester</div>
                                    <!-- <div class="Rtable-cell date-cell column-heading">Document</div>  -->
                                    <div class="Rtable-cell date-cell column-heading">Status</div>
                                    

                                </div>
                                <nb-list>
                                    <nb-list-item class="Rtable-row is-striped"
                                        *ngFor="let data of userProcessedApplication;let i=index;">
                                        <div class="Rtable-cell date-cell">
                                            <div class="Rtable-cell--heading">Application ID</div>
                                            <div class="Rtable-cell--content date-content">{{data.id}}</div>
                                        </div>
                                        <div class="Rtable-cell date-cell">
                                            <div class="Rtable-cell--heading">Name</div>
                                            <div class="Rtable-cell--content date-content">{{data.first_name}}</div>
                                        </div>
                                        <div class="Rtable-cell date-cell">
                                            <div class="Rtable-cell--heading">Seat No.</div>
                                            <div class="Rtable-cell--content date-content">{{data.seat_number}}
                                            </div>
                                        </div>
                                        <div class="Rtable-cell date-cell">
                                            <div class="Rtable-cell--heading">Passing Year</div>
                                            <div class="Rtable-cell--content date-content">{{data?.year_passing}}
                                            </div>
                                        </div>
                                        <div class="Rtable-cell date-cell">
                                            <div class="Rtable-cell--heading">Stream</div>
                                            <div class="Rtable-cell--content date-content">{{data?.stream}}</div>
                                        </div>
                                        <div class="Rtable-cell date-cell">
                                            <div class="Rtable-cell--heading">Branch</div>
                                            <div class="Rtable-cell--content date-content">{{data?.branch}}</div>
                                        </div>
                                        <div class="Rtable-cell date-cell">
                                            <div class="Rtable-cell--heading">Semester</div>
                                            <div class="Rtable-cell--content date-content">{{data?.semester}}</div>
                                        </div>
                                        <div class="Rtable-cell date-cell" [ngStyle]="{'color': (data?.payment_status === 0) ? 'red' : 'green'  }">
                                            <div class="Rtable-cell--heading">Status</div>
                                            <div class="Rtable-cell--content date-content">{{data?.payment_status == 0 ? 'not paid' : 'paid'}}</div>
                                        </div>
                                
                                     
                                        

                                    </nb-list-item>
                                </nb-list>
                            </div>
        </nb-card-body>
      </nb-card>`,
})
export class PaidApplicationComponent  {
  user_id;
  role;
  userProcessedApplication: any;
  flagApp:boolean=false
  constructor(private router: Router,
    private userStore: UserStore,
    private applicationapi: ApplicationApi,) {
   
  }
  ngOnInit() {
    if(this.userStore.getUser() == undefined){
      this.router.navigate(['auth/login']);
    }else{
      this.applicationapi.getProcessedApplications().subscribe(data => {
        
        this.userProcessedApplication = data['data'];
            if(this.userProcessedApplication == undefined){
              this.flagApp=true;
            }
      })
    }

  }

  redirect(){
    this.router.navigateByUrl('/pages/dashboard');
  }

  

  
  

}