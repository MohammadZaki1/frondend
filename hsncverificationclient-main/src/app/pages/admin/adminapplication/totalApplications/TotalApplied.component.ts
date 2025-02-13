import { ThrowStmt } from '@angular/compiler';
import { ChangeDetectorRef, Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';

import { ApplicationApi } from '../../../../@core/backend/common/api/application.api';
import { User, UserData } from '../../../../@core/interfaces/common/users';
import { UserStore } from '../../../../@core/stores/user.store';
import { ConfirmationDialogComponent } from './dialogs/confirm/confirmation-dialog/confirmation-dialog.component';
import { PdfViewComponent } from './dialogs/documentView/pdf-viewer/pdf-viewer.component';
import { ErrataDialogComponent } from './dialogs/errata/errata-dialog/errata-dialog.component';


@Component({
  selector: 'totalapplied',
  styleUrls: ['./TotalApplied.component.scss'],
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
        <div class="col-md-6 col-sm-6">
        Payment Status
        <select (change)="onChange($event.target.selectedIndex)" ngDefaultControl class="form-control form-control-lg" formControlName="level">
        <option [ngValue]="level" *ngFor="let level of levels">{{level}}</option>
        </select>
        </div>
        <div  (click)="redirect()">
        <i title="Back To Dashboard" class="fas fa-arrow-left fa-2x fa-pull-right fa-border"></i>
      </div>
        </nb-card-header>
        <nb-card-header  *ngIf=flagApp>Sorry No Data <br>  No Applications found</nb-card-header>
        <nb-card-body>
        <!-- <div class="group-2">
    <div>
        <img *ngFor="let img of imageObject; let i = index" [src]="img.thumbImage || img.posterImage" (click)="showLightbox(i)" />
    </div>
</div> -->
 
        <ng-image-fullscreen-view
        [images]="imageObject"
        [imageIndex]="currentIndex"
        [show]="showFlag"
        (close)="closeEventHandler()"></ng-image-fullscreen-view>

        
        <div class="Rtable Rtable--5cols Rtable--collapse" *ngIf="userApplication?.length">
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
                                    <div class="Rtable-cell date-cell column-heading">Action</div>
                                    

                                </div>
                                <nb-list>
                                    <nb-list-item class="Rtable-row is-striped"
                                        *ngFor="let data of userApplication| paginate:{itemsPerPage: 10, currentPage:p2 , id:'2' };let i=index;">
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
                                
                                        <div class="Rtable-cell date-cell">
                                            <div class="Rtable-cell--heading">View</div>
                                            <div class="Rtable-cell--content date-content" ngDefaultControl>
                                            <div class="Rtable-cell--content date-content" >
                                            <nb-actions size="small">
                                            <nb-action (click)="viewDocument(data?.choose_file)">
                                     <div style="color: #00b887;"><i class="fa-solid fa-binoculars" status="info" nbPopover="View Document" nbPopoverMode="hover"></i>
                                     View</div>
                                    </nb-action>
                                    <nb-action (click)="verify(data?.id,data?.first_name,data?.last_name,data?.email)"  >
                                     <div style="color: ##72A0C1;"><i class="fa-solid fa-check-double" status="primary" nbPopover="Verify Application" nbPopoverMode="hover"></i>
                                     Verify</div>
                                    </nb-action>
                                    <nb-action (click)="errata(data?.id,data?.userId,data?.first_name,data?.last_name,data?.choose_file)" >
                                     <div style="color: #C70039;"><i class="fa-solid fa-triangle-exclamation" status="danger" nbPopover="Raise Errata" nbPopoverMode="hover"></i>
                                     Errata</div>
                                    </nb-action>     
                                            </nb-actions>
                  <!-- <i class="fa-solid fa-binoculars" status="info" nbPopover="View Document" nbPopoverMode="hover"
                  (click)="viewDocument(data?.choose_file)"></i>View <br> 
                    <i class="fa-solid fa-check-double" status="info" nbPopover="View Document" nbPopoverMode="hover"
                  (click)="verify(data?.id,data?.first_name,data?.last_name,data?.email)"></i>Verify <br> 
                   <i class="fa-solid fa-triangle-exclamation" status="info" nbPopover="Raise Errata" nbPopoverMode="hover"
                  (click)="errata(data?.id,data?.userId,data?.first_name,data?.last_name,data?.choose_file)"></i>Errata -->
                </div>
                <!-- <div class="Rtable-cell--content date-content" >
                
                </div>
                <div class="Rtable-cell--content date-content" >
                 
                </div> -->
                                                <!-- <nb-actions>
                                                    
                                                        <nb-action (click)="viewDocument(data?.choose_file)">
                                                        <i class="fa-solid fa-binoculars" title="view"></i>
                                                          </nb-action>

                                                          <nb-action (click)="verify()">
                                                          <i class="fa-solid fa-check-double" title="verify"></i>
                                                          </nb-action>

                                                          <nb-action (click)="errata()">
                                                           <i class="fa-solid fa-triangle-exclamation" title="errata"></i>
                                                         </nb-action>
                                                    
                                                </nb-actions> -->
                                             
                                            </div>
                                        </div>  
                                        

                                    </nb-list-item>
                                </nb-list>
                            </div>
                            <div>
                             <pagination-controls style="float:right;" (pageChange)="p2=$event" id='2'></pagination-controls>
                            </div>
        </nb-card-body>
      </nb-card>
      <pdf-viewer
            src="https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf"
            [rotation]="0"
              [fit-to-page]="true"
              [original-size]="true"
              [show-all]="true"
              style="display: block;"
            ></pdf-viewer>
    `,
})
export class TotalAppliedComponent  {
  userApplication: any;
  email: string;
  id: any;
  images:any; 
  imageIndex:any;
  role: string;
  user: User; 
  p2: number = 1;
  currentIndex: any = -1;
  showFlag: any = false;
  imageObject: Array<object> = [{}];
  flagApp:boolean=false
  totalLength: any;
  page: number = 1;
  themeService: any;
  settingsService: any;
  paymentdata: any;
  oldFilterData: [];
  levels = [
    "Unpaid",
    "Paid",
    "All",
  ];

  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();
  constructor(private router: Router,
    private applicationapi: ApplicationApi,
    private userStore: UserStore,
    private toasterService: NbToastrService,
    private usersService: UserData,
    private dialogService: NbDialogService,
    ) {
   
  }
   ngOnInit() {
    if(this.userStore.getUser() == undefined){
      this.router.navigate(['auth/login']);
    }else{
      this.applicationapi.getApplications().subscribe(data => {
        this.userApplication = data['data'];
        this.oldFilterData = this.userApplication           
        if(this.userApplication!=null){
          this.flagApp=false;
        }else{
          this.flagApp=true;
        }
      })
    }
  }

  onChange(option) {
    this.userApplication = this.oldFilterData
    var filterData= this.userApplication.filter(e=>{
      return e.payment_status === option;
    });
    this.userApplication=filterData;
  }


  viewDocument(url){
    const dialogRef = this.dialogService.open(PdfViewComponent, {
      context: {
        src:url,
      },
    });
  }

  redirect(){
    this.router.navigateByUrl('/pages/dashboard');
  }

  showLightbox(index) {
    this.currentIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }

  verify(id,first_name,last_name,email){
    const dialogRef = this.dialogService.open(ConfirmationDialogComponent, {
      context: {
        id: id,
        first_name:first_name,
        last_name:last_name,
        email:email,
      },
    });
    dialogRef.onClose.subscribe((resp) => {
      if(resp != undefined){
        this.applicationapi.processApplication(resp).subscribe(data => {
          this.toasterService.success('moved to processed applications tab');
          this.ngOnInit();
        })
      }else{
        this.toasterService.danger('Did not process the application');
      }
    });
  }

  errata(id,userId,first_name,last_name,choose_file){
    //Show popup ask admin to input information
    const dialogref=this.dialogService.open(ErrataDialogComponent, {
      context: {
        id: id,
        first_name:first_name,
        last_name:last_name,
        choose_file:choose_file,
        userId:userId,
      },
    });
    dialogref.onClose.subscribe((resp) => {
      this.applicationapi.errataApplication(resp[0],resp[1],resp[2],resp[3],resp[4],resp[5],'admin').subscribe(data =>{})
    })
  }

  
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closeEventHandler();
  }

  @HostListener("contextmenu", ["$event"]) onRightClick(event) {
    this.closeEventHandler();
  }

}