
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationApi } from '../../../../@core/backend/common/api/application.api';


@Component({
  selector: 'registeredagent',
  styleUrls: ['./RegisteredAgent.component.scss'],
  template: `
  <nb-card>

  <nb-card-header  *ngIf=flagApp>Sorry No Data <br>  No Applications found
  <div  (click)="redirect()">
  <i title="Back To Dashboard" class="fas fa-arrow-left fa-2x fa-pull-right fa-border"></i>
</div>
  
  </nb-card-header>
 
      <nb-card-body>
       
        
        <div class="Rtable Rtable--5cols Rtable--collapse" *ngIf="agents?.length > 0" >
            <div class="Rtable-row Rtable-row--head">
              <div class="Rtable-cell date-cell column-heading">ID</div>
              <div class="Rtable-cell date-cell column-heading">Name</div>
              <div class="Rtable-cell date-cell column-heading">Email</div>
              <div class="Rtable-cell date-cell column-heading">Role</div>
              <div class="Rtable-cell date-cell column-heading">GST No</div>
              <div class="Rtable-cell date-cell column-heading">Pan No</div>
            </div>

            <nb-list>
                        <nb-list-item class="Rtable-row is-striped" *ngFor="let data of agents;let i=index;">
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
                            <div class="Rtable-cell date-cell">
                                <div class="Rtable-cell--heading">gstno</div>
                                <div class="Rtable-cell--content date-content">{{ data?.gstno}}</div>
                            </div>

                            <div class="Rtable-cell date-cell">
                                <div class="Rtable-cell--heading">panNo</div>
                                <div class="Rtable-cell--content date-content">{{ data?.panNo}}</div>
                            </div>
                            
                        </nb-list-item>
                    </nb-list>
              
        </div> 
      </nb-card-body>
    </nb-card>`
})
export class RegisteredAgentComponent  {
  user_id;
  role;
  agents: any;
  registerAgent: any;
  flagApp:boolean;
  constructor(private router: Router,
    private api : ApplicationApi
    ) {
   
  }

  async ngOnInit() {
    this.api.getAgents().subscribe(data=>{
      this.agents= data['data'];
      if(this.agents.length!=0){
          this.flagApp=false;
        }
        else if(this.agents.length===0) {
          this.flagApp=true;
        }
    })
  }

  redirect(){
    this.router.navigateByUrl('/pages/dashboard');
  }

  

  
  

}