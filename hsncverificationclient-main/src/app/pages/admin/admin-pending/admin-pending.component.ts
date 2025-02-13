import { Component, OnInit } from '@angular/core';
import { ApplicationApi } from '../../../@core/backend/common/api/application.api';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';
import { ActivatedRoute,  Router } from '@angular/router';
import { Data } from '../../../../assets/data/data';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ConfirmationService } from 'primeng/api';
import { UserData } from '../../../@core/interfaces/common/users';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { saveAs } from 'file-saver';
import { type } from 'os';
import {NbDialogService } from '@nebular/theme';
import * as moment from 'moment'

@Component({
  selector: 'ngx-admin-pending',
  templateUrl: './admin-pending.component.html',
  styleUrls: ['./admin-pending.component.scss'],
  providers:[ConfirmationService],
})
export class AdminPendingComponent implements OnInit {
  Countries: any [];
  p4: number = 1;
  p1: number = 1;
  p2: number = 1;
  p3: number = 1;

  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();

  public filterText3: string;
  public filterPlaceholder3: string;
  public filterInput3 = new FormControl();

  public filterText1: string;
  public filterPlaceholder1: string;
  public filterInput1 = new FormControl();

  public filterText2: string;
  public filterPlaceholder2: string;
  public filterInput2 = new FormControl();

  setActivePending : boolean = false;
  setActiveRequested : boolean = false;
  setActiveChanged : boolean = false;
  setActiveReject : boolean = false;

  selectedYear ='2019'
  studentdata: any;
  active: any;
  searchForm:FormGroup;
  id: any;
  name : string;
  email : string;
  startDate: string;
  endDate: string;
  loadingXL: boolean;
  dateRange: any;
  dateForm: FormGroup;
  outward: FormGroup;
  isLoadingResults: boolean = false;
  isLoadingResults1: boolean = false;
  isLoadingResults2: boolean = false;
  isLoadingResults3: boolean = false;

  newap: boolean=true;
  request:boolean=false;
  change:boolean=false;
  reject:boolean=false;
  rejectedapp: boolean;

  studentLength : any;
  student_name : any;
  index: number;
  tabId: string;
  tabChange: any;
  admin:any;
  protected readonly unsubscribe$ = new Subject<void>();
  page: number = 1;
  type: any;
  loader: boolean;
  display: boolean;
  user_id: any;
  app_id: any;
  userId: any;
  // email : any;


  constructor(  private api: ApplicationApi, 
    private authService : NbAuthService,
    private router : Router,
    private route : ActivatedRoute,
    private globalVar : Data,
    public dialogService: NbDialogService,
    public toasterService: NbToastrService,
    private formBuilder:FormBuilder,
    private ConfirmationService: ConfirmationService,
    private usersService: UserData,) {
      this.usersService.getCurrentUser().pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => { 
        this.admin = user;
        if(this.admin.is_email_verified == true && this.admin.is_otp_verified == true){
          if(this.admin.role != 'admin'  && this.admin.role != 'subAdmin'){
            this.router.navigate(['auth/logout']);
          }
        }else{
          this.router.navigate(['auth/logout']);
        }
      })
   }

  ngOnInit() {
    // this.refresh(null,null);

    this.filterText = "";
    this.filterPlaceholder = "Local Search";
    if(this.route.snapshot.queryParamMap.get('page')){
      this.p1 = parseInt(this.route.snapshot.queryParamMap.get('page'));
    }else{
      this.p1 = 1; 
    }
    
    if(this.route.snapshot.queryParamMap.get('tab')=='requested'){
      this.p2 = parseInt(this.route.snapshot.queryParamMap.get('page'));
      this.page=this.p2
    }else if(this.route.snapshot.queryParamMap.get('tab')=='changed'){
      this.p3 = parseInt(this.route.snapshot.queryParamMap.get('page'));
      this.page=this.p3
    }else if(this.route.snapshot.queryParamMap.get('tab')=='reject'){
      this.p4 = parseInt(this.route.snapshot.queryParamMap.get('page'));
      this.page=this.p4
    }else if(this.route.snapshot.queryParamMap.get('tab')=='new'){
      this.p1 = parseInt(this.route.snapshot.queryParamMap.get('page'));
      this.page=this.p1
    }
    if(this.route.snapshot.queryParamMap.get('tab')){
      this.tabId=this.route.snapshot.queryParamMap.get('tab')
    }else{
      this.tabId = 'new';
    }
    this.refresh('',this.student_name,this.email,this.tabId);
    this.index = parseInt(this.route.snapshot.queryParamMap.get('index'));
    // this.changeTab(null)
    
    this.searchForm = this.formBuilder.group({
      idCtrl : [''],
      nameCtrl:[''],
      emailCtrl:[''],
      outward:[''],
    })

    this.dateForm = this.formBuilder.group({
      dateCtrl:[''],
    }) 
  }

  handleClick(user_id,app_id) {
    this.router.navigate(['pages/adminView'],{queryParams:{userId : user_id, app_id : app_id, viewFrom : 'total'}});
  }

  pageChanged(p: number) {
    console.log("Page Changed: ", p);
    this.page = p;
    this.p1 = p; // Ensure p1 is updated
    
    if (this.setActivePending) {
        this.p1 = p;
    } else if (this.setActiveRequested) {
        this.p2 = p;
    } else if (this.setActiveChanged) {
        this.p3 = p;
    } else if (this.setActiveReject) {
        this.p4 = p;
    }

    // Refresh data based on the current page
    this.refresh(
        this.searchForm.controls.idCtrl.value,
        this.searchForm.controls.nameCtrl.value,
        this.searchForm.controls.emailCtrl.value,
        this.tabId
    );
}


  search(){
    if(this.searchForm.controls.idCtrl.value || this.searchForm.controls.nameCtrl.value || this.searchForm.controls.emailCtrl.value){
      this.refresh(this.searchForm.controls.idCtrl.value,this.searchForm.controls.nameCtrl.value,this.searchForm.controls.emailCtrl.value,this.tabId);
    }else{
      alert("Please specify any of the search criteria")
    }
  }
  
  refresh(id, student_name, email,type){
    var id = id ;
    student_name = student_name;
    email = email;
    this.isLoadingResults = true;
    this.api.getAll_PendingApplications(this.page,student_name,email,type,id).subscribe(data =>{
      this.isLoadingResults = false;
      this.studentdata = data['items'];
      console.log("this.studentdata", this.studentdata)
      this.studentLength = data['total_count'];
      // this.active=data['counts'];
    })
    this.filterInput
      .valueChanges
      // .debounceTime(200)
      .subscribe(term => {
       this.filterText = term;
    });
  }

 

  Verify(userId,app_id){
    this.ConfirmationService.confirm({
      message: 'Do you want to verify this application?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {			
        this.loader = true;

        this.api.generateCertificates(userId,app_id,this.admin.email).subscribe((data: any) => {
          if(data['status'] ==  200){
            this.loader = false;
            this.toasterService.success('Application ' + app_id + 'verifed successfully');
            this.refresh('',this.student_name, this.email,this.tabId);
          }else{
            this.toasterService.danger(data['message']);
            this.refresh('',this.student_name, this.email,this.tabId);

          }
        })
      },
      reject: () =>{
        
      }
    })
  }

  Reject(userId,app_id){
    this.searchForm.controls.outward.patchValue('')
    this.user_id= userId;
    this.app_id = app_id
    

    this.ConfirmationService.confirm({
      message: 'Do you want to Reject this application?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {		
        this.display =true;	
      },
    });
  }
  

  ok(userId,app_id){
    this.display = false;
    this.api.rejectApplication(userId,app_id,'reject', this.searchForm.controls.outward.value).subscribe((data: any) => {
      console.log("data", data)
      if(data['status'] ==  200){
        this.toasterService.success('Application ' + app_id + ' Rejected');
        this.refresh('',this.student_name, this.email,this.tabId);
      }else{
        this.toasterService.danger(data['message']);
      }
    })
  }
  

  NEWAPPLICATION(){
    this.newap=true;
    this.request=false;
    this.change=false;
    this.reject=false;
    this.tabId = 'new';
    this.refresh('',null,null,this.tabId);
  }

  REQUESTEDAPPLICATION(){
    this.newap=false;
    this.request=true;
    this.change=false;
    this.reject=false;
    this.tabId = 'requested';
    this.refresh('',null,null,this.tabId);
  }

  CHANGEDAPPLICATION(){
    this.newap=false;
    this.request=false;
    this.change=true;
    this.reject=false;
    this.tabId = 'changed';
    this.refresh('',null,null,this.tabId);
  }

  REJECTAPPLICATION(){
    this.newap=false;
    this.request=false;
    this.change=false;
    this.reject=true;
    this.tabId = 'reject';
    this.refresh('',null,null,this.tabId);
  }

  downloadExcel(tabtype){
    this.loadingXL = true;
    this.dateRange= this.dateForm.controls.dateCtrl.value
    this.endDate = (this.dateRange) ? moment(new Date(this.dateRange.end)).format("YYYY-MM-DD") : '';
    this.startDate = (this.dateRange) ? moment(new Date(this.dateRange.start)).format("YYYY-MM-DD"): '';
    this.api.downloadExcel('apply',tabtype,this.startDate,this.endDate).subscribe((response)=>{
      if(response[`status`] == 200){
        this.api.downloadFiles(response[`data`])
        .subscribe(data => {
          this.loadingXL = false;
          saveAs(data, 'Verification('+tabtype+').xlsx'); 
        });
        this.ngOnInit();
      }else if(response[`status`] == 400){
        this.toasterService.warning('No data for selected date')
        this.loadingXL = false;
      }
    })
  }
  
  //remove application from reject tab
  removefromrejectApplication(user_id,appl_id){
    this.ConfirmationService.confirm({
      message: 'Do you want to remove the applicant from reject',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {			
        this.api.removefromreject(appl_id , user_id).subscribe((data: any) => {
          if(data['status'] == 200){
            this.toasterService.success('Application Removed from Reject !!!','Success',{duration: 3000});
          }else if(data['status'] == 400){
            this.toasterService.danger(data['message'],{duration: 3000});
          } 
            this.ngOnInit();   
            err => console.error(err);
        },
        error=>console.error("Error", error)
      )},
    });
  }
  
}
