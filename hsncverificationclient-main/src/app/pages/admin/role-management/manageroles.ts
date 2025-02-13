import { Component, Input } from '@angular/core';
import { NbDialogRef, NbDialogService, NbThemeService, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import { ApplicationApi } from '../../../@core/backend/common/api/application.api';

@Component({
selector: 'nb-dialog',
providers:[ConfirmationService],
template: `
<nb-card class="widthCSS"> 
    <nb-card-header>
        <div class="row">
            <div class="col-9">Role Management</div>
            <div class="col-3">
                <button nbButton type="button" (click)="close1()" class="close closeBtn">Close</button>
            </div>    
        </div>
    </nb-card-header>
    <nb-card-body>
        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4"><h5 >Sub-Admin Roles</h5></div>
            <div class="col-md-4"></div>
        </div>
        
        <div class="row">
            <div class="col-md-4"  style="padding-bottom: 10px;">Admin Dashboard
                <input type="checkbox" [checked]="aChecked" (change)="onCheckboxChange($event, 'admindashboard')" >
            </div>
            <div class="col-md-4"  style="padding-bottom: 10px;">Student Management
                <input type="checkbox" [checked]="bChecked" (change)="onCheckboxChange($event, 'studentmanagement')" >
            </div>
            <!-- <div class="col-md-4"  style="padding-bottom: 10px;">College Management
                <input type="checkbox" [checked]="cChecked" (change)="onCheckboxChange($event, 'collegeManagement')" >
            </div> -->
            <div class="col-md-4"  style="padding-bottom: 10px;">Student Feedback
                <input type="checkbox" [checked]="mChecked" (change)="onCheckboxChange($event, 'studentfeedback')" >
            </div>
        </div><br>
        <div class="row">
            <div class="col-md-4"  style="padding-bottom: 10px;">Total Applications
                <input type="checkbox" [checked]="dChecked" (change)="onCheckboxChange($event, 'adminTotal')" >
            </div>
            <div class="col-md-4"  style="padding-bottom: 10px;">Pending Applications
                <input type="checkbox" [checked]="eChecked" (change)="onCheckboxChange($event, 'adminPending')" >
            </div>
            
            <div class="col-md-4"  style="padding-bottom: 10px;">Signed Applications
                <input type="checkbox" [checked]="gChecked" (change)="onCheckboxChange($event, 'adminSigned')" >
            </div>
        </div><br>
        <div class="row">
            
            
            <div class="col-md-4"  style="padding-bottom: 10px;">Sent Application
                <input type="checkbox" [checked]="jChecked" (change)="onCheckboxChange($event, 'adminEmailed')" >
            </div>
            <div class="col-md-4"  style="padding-bottom: 10px;">Payment
                <input type="checkbox" [checked]="kChecked" (change)="onCheckboxChange($event, 'adminpayment')" >
            </div>
            <div class="col-md-4"  style="padding-bottom: 10px;">Help
                <input type="checkbox" [checked]="nChecked" (change)="onCheckboxChange($event, 'help')" >
            </div>

        </div><br>
        <div class="row">
            <!-- <div class="col-md-4"  style="padding-bottom: 10px;">Wes Application
                <input type="checkbox" [checked]="iChecked" (change)="onCheckboxChange($event, 'adminWesApp')" >
            </div> -->
           
            <div class="col-md-4"  style="padding-bottom: 10px;">Report
                <input type="checkbox" [checked]="lChecked" (change)="onCheckboxChange($event, 'adminReport')" >
            </div>
            <!-- <div class="col-md-4"  style="padding-bottom: 10px;">Verified Applications
                <input type="checkbox" [checked]="fChecked" (change)="onCheckboxChange($event, 'adminVerified')" >
            </div> -->
        </div><br>
         <div class="row">
            <div class="col-md-12" style="text-align:center;">
                <button type="button" nbButton hero status="primary" (click)="add()">ADD</button>
            </div>
            <div class="col-md-12" style="text-align:center;">
                <span *ngIf="RoleError == true"  style="color:red;">Please select the roles</span>
            </div>
        </div>
    </nb-card-body>
    </nb-card>
`,
styles:[`
            .widthCSS{
                width: 700px
            }
            @media all and (min-width: 500px) {
                .widthCSS{
                    width: 700px
                }
            }
      `]
})

export class SubAdminRolesComponent {
    @Input() userid: string;
    roles = [];
    superroles = [];
    supersource = [];
    aChecked; 
    bChecked; 
    cChecked;
    dChecked; 
    eChecked; 
    fChecked;
    gChecked; 
    hChecked; 
    iChecked;
    jChecked; 
    kChecked; 
    lChecked;
    mChecked;
    nChecked;
    oChecked;
    pChecked;
    qChecked;
    rChecked;
    sChecked;
    tChecked;
    uChecked;
    SaChecked; 
    SbChecked; 
    ScChecked;
    SdChecked; 
    SeChecked; 
    SfChecked;
    SgChecked; 
    ShChecked; 
    SiChecked;
    SjChecked; 
    SkChecked; 
    SlChecked;
    SmChecked;
    SnChecked;
    SoChecked;
    SuChecked;
    aSourChecked = false; 
    bSourChecked = false; 
    cSourChecked = false; 
    dSourChecked = false; 
    eSourChecked = false;
    fSourChecked = false;
    gSourChecked = false;
    hSourChecked = false;

    RoleError = false;
    activate;
    deactivate;
    activity: any;
    
    constructor(protected ref: NbDialogRef<SubAdminRolesComponent>,
    protected api : ApplicationApi,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    public themeService : NbThemeService,
    private confirmationService: ConfirmationService,
    public toasterService: NbToastrService,) {
        
    }

    dismiss() {
        this.ref.close();
    }
  
    ngOnInit() {
       
        this.api.getRolesData(this.userid).subscribe((data:any)=>{
            if(data['status']== 200){
                this.aChecked = data['data']['admindashboard']; 
                this.bChecked = data['data']['studentmanagement']; 
                this.cChecked = data['data']['collegeManagement'];
                this.dChecked = data['data']['adminTotal']; 
                this.eChecked = data['data']['adminPending']; 
                this.fChecked = data['data']['adminVerified'];
                this.gChecked = data['data']['adminSigned']; 
                this.iChecked = data['data']['adminWesApp']; 
                this.jChecked = data['data']['adminEmailed']; 
                this.kChecked = data['data']['adminpayment']; 
                this.lChecked = data['data']['adminReport'];
                this.mChecked = data['data']['studentfeedback'];
                this.nChecked = data['data']['help'];
                if(data['data']['admindashboard']){
                    this.roles.push('admindashboard')
                }
                if(data['data']['studentmanagement']){
                    this.roles.push('studentmanagement')
                }
                if(data['data']['collegeManagement']){
                    this.roles.push('collegeManagement')
                }
                if(data['data']['adminTotal']){
                    this.roles.push('adminTotal')
                }
                if(data['data']['adminPending']){
                    this.roles.push('adminPending')
                }
                if(data['data']['adminVerified']){
                    this.roles.push('adminVerified')
                }
                if(data['data']['adminSigned']){
                    this.roles.push('adminSigned')
                }
                if(data['data']['adminWesApp']){
                    this.roles.push('adminWesApp')
                }
                if(data['data']['adminEmailed']){
                    this.roles.push('adminEmailed')
                }
                if(data['data']['adminpayment']){
                    this.roles.push('adminpayment')
                }
                if(data['data']['adminReport']){
                    this.roles.push('adminReport')
                }
                if(data['data']['studentfeedback']){
                    this.roles.push('studentfeedback')
                }
                
            }else if(data['status']== 400){
                
            }
        })
    }

    onCheckboxChange(event, value) {
        if (event.target.checked) {
          this.roles.push(value);
        } 
    
        if (!event.target.checked) {
    
          let index = this.roles.indexOf(value);
          if (index > -1) {
            this.roles.splice(index, 1);
          }
        }
    }

    close1(){
        this.ref.close();
    }

    add(){
        if(this.roles.length > 0){
            this.api.addupdateRole(this.roles, this.userid)
                .subscribe((data: any) => {
                    if(data['status']== 200){
                        this.toasterService.success(data['message']);
                        this.ref.close();
                    }else if(data['status']== 400){
                        this.toasterService.danger(data['message']);
                        this.ref.close();
                    }
            })
        }else{
            this.RoleError = true;
        }
       
    }

    selectService(event){
        this.activity = event.value;
    }

}
