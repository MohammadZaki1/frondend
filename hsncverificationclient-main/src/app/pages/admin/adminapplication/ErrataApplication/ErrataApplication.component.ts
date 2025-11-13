
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { ApplicationApi } from '../../../../@core/backend/common/api/application.api';
import { UserStore } from '../../../../@core/stores/user.store';

@Component({
  selector: 'errataapplication',
  styleUrls: ['./ErrataApplication.component.scss'],
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
        <div class="Rtable Rtable--5cols Rtable--collapse" *ngIf="errataApplication?.length">
                                <div class="Rtable-row Rtable-row--head">
                                    <div class="Rtable-cell date-cell column-heading">Application ID</div>
                                    <div class="Rtable-cell date-cell column-heading">Errata Message</div>
                                    <div class="Rtable-cell date-cell column-heading">User Id</div>
                                    <div class="Rtable-cell date-cell column-heading">First Name</div>
                                    <div class="Rtable-cell date-cell column-heading">Last Name</div>
                                    <div class="Rtable-cell date-cell column-heading">Last Updated By</div>
                                    <div class="Rtable-cell date-cell column-heading">View File</div>
                                    
                                    <!-- <div class="Rtable-cell date-cell column-heading">Passing Year</div>
                                    <div class="Rtable-cell date-cell column-heading">Stream</div>
                                    <div class="Rtable-cell date-cell column-heading">Branch</div>
                                    <div class="Rtable-cell date-cell column-heading">Semester</div> -->
                                    <!-- <div class="Rtable-cell date-cell column-heading">Document</div>  -->
                                    <!-- <div class="Rtable-cell date-cell column-heading">Status</div> -->
                                    

                                </div>
                                <nb-list>
                                    <nb-list-item class="Rtable-row is-striped"
                                        *ngFor="let data of errataApplication;let i=index;">
                                        <div class="Rtable-cell date-cell">
                                            <div class="Rtable-cell--heading">Application ID</div>
                                            <div class="Rtable-cell--content date-content">{{data.applicationId}}</div>
                                        </div>
                                        <div class="Rtable-cell date-cell">
                                            <div class="Rtable-cell--heading">Errata Message </div>
                                            <div class="Rtable-cell--content date-content">{{data.errataMessage}}</div>
                                        </div>
                                        <div class="Rtable-cell date-cell">
                                            <div class="Rtable-cell--heading">User Id</div>
                                            <div class="Rtable-cell--content date-content">{{data.userId}}
                                            </div>
                                        </div>
                                        <div class="Rtable-cell date-cell">
                                            <div class="Rtable-cell--heading">First Name</div>
                                            <div class="Rtable-cell--content date-content">{{data.firstName}}
                                            </div>
                                        </div>
                                        <div class="Rtable-cell date-cell">
                                            <div class="Rtable-cell--heading">Last Name</div>
                                            <div class="Rtable-cell--content date-content">{{data.lastName}}
                                            </div>
                                        </div>
                                        <div class="Rtable-cell date-cell">
                                            <div class="Rtable-cell--heading">Last Updated By</div>
                                            <div class="Rtable-cell--content date-content">{{data.lastErrata}} 
                                            </div>
                                        </div>
                                        <div class="Rtable-cell date-cell">
                                            <div class="Rtable-cell--heading">View File</div>
                                            <!-- <div class="Rtable-cell--content date-content">{{data.fileUrl}} 
                                            </div> -->
                                            <i class="fa-solid fa-eye" status="info" nbPopover="View File" nbPopoverMode="hover"
                  (click)="view(data?.fileUrl)"></i>
                                        </div>
                                        <!-- <div class="Rtable-cell date-cell">
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
                                        </div> -->
                                        <!-- <div class="Rtable-cell date-cell" [ngStyle]="{'color': (data?.payment_status === 0) ? 'red' : 'green'  }">
                                            <div class="Rtable-cell--heading">Status</div>
                                            <div class="Rtable-cell--content date-content">{{data?.payment_status == 0 ? 'not paid' : 'paid'}}</div>
                                        </div>
                                 -->
                                     
                                        

                                    </nb-list-item>
                                </nb-list>
                            </div>
        </nb-card-body>
      </nb-card>`,
})
export class ErrataApplicationComponent  {
  user_id;
  role;
  errataApplication: any;
  flagApp:boolean=false
  constructor(private router: Router,
    private userStore: UserStore,
    private applicationapi: ApplicationApi,) {
   
  }
  ngOnInit() {
    if(this.userStore.getUser() == undefined){
      this.router.navigate(['auth/login']);
    }else{
      this.applicationapi.getErrataApplications().subscribe(data => {
        
        this.errataApplication = data['data'];
            if(this.errataApplication == undefined){
              this.flagApp=true;
            }
      })
    }

  }

  redirect(){
    this.router.navigateByUrl('/pages/dashboard');
  }

  
view(url){
  window.open(url, '_blank')
}
  
  

}