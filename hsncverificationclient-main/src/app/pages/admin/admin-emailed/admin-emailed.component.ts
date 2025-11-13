import { Component, OnInit } from '@angular/core';
import { ApplicationApi } from '../../../@core/backend/common/api/application.api';
import { NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { UserData } from '../../../@core/interfaces/common/users';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { saveAs } from 'file-saver';
import * as moment from 'moment'

@Component({
  selector: 'ngx-admin-emailed',
  templateUrl: './admin-emailed.component.html',
  styleUrls: ['./admin-emailed.component.scss']
})

export class AdminEmailedComponent implements OnInit {
  Countries: any [];
  p: number = 1;
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  selectedYear ='2019'
  studentdata: any;
  active: any;
  searchForm:FormGroup;
  name : string;
  email : string;
  isLoadingResults: boolean = false;
  studentLength : any;
  student_name: any;
  protected readonly unsubscribe$ = new Subject<void>();
  admin: any;
  startDate: string;
  endDate: string;
  loadingXL: boolean;
  dateRange: any;
  dateForm: FormGroup;

  constructor(  private api: ApplicationApi, 
    private router : Router,
    public toasterService: NbToastrService,
    private formBuilder:FormBuilder,
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
    this.filterText = "";
    this.filterPlaceholder = "Local Search";
    this.refresh(null,null);
    this.searchForm = this.formBuilder.group({
      nameCtrl:[''],
      emailCtrl:['']
    })
    this.dateForm = this.formBuilder.group({
      dateCtrl:[''],
    }) 
  }

  handleClick(user_id,app_id) {
    this.router.navigate(['pages/adminView'],{queryParams:{userId : user_id, app_id : app_id, viewFrom : 'total'}});
  }
  pageChanged(event){
    this.p = event;
    this.refresh(this.searchForm.controls.nameCtrl.value,this.searchForm.controls.emailCtrl.value);
  }

  // search(){
  // }
  search(){
    if(this.searchForm.controls.nameCtrl.value || this.searchForm.controls.emailCtrl.value){
      this.refresh(this.searchForm.controls.nameCtrl.value,this.searchForm.controls.emailCtrl.value);
    }else{
      alert("Please specify any of the search criteria")
    }
  }

  refresh(student_name, email){
    this.student_name=student_name;
    this.isLoadingResults = true;
    this.api.getAll_emailedApplications(this.p,student_name,email).subscribe(data =>{
      this.isLoadingResults = false;
      this.studentdata = data['items'];
      this.studentLength = data['total_count'];
    })
    this.filterInput
      .valueChanges
      // .debounceTime(200)
      .subscribe(term => {
       this.filterText = term;
    });
  }

  downloadExcel(done){
    this.loadingXL = true;
    this.dateRange= this.dateForm.controls.dateCtrl.value
    this.endDate = (this.dateRange) ? moment(new Date(this.dateRange.end)).format("YYYY-MM-DD") : '';
    this.startDate = (this.dateRange) ? moment(new Date(this.dateRange.start)).format("YYYY-MM-DD"): '';
    this.api.downloadExcel('done' ,'accept',this.startDate,this.endDate).subscribe((response)=>{
      if(response[`status`] == 200){
        this.api.downloadFiles(response[`data`])
        .subscribe(data => {
          this.loadingXL = false;
          saveAs(data, 'Verification('+done+').xlsx'); 
        });
        this.ngOnInit();
      }else if(response[`status`] == 400){
        this.toasterService.warning('No data for selected date')
        this.loadingXL = false;
      }
    })
  }

}
