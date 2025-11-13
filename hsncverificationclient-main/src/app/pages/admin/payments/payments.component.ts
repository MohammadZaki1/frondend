import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder  } from '@angular/forms';
import{ApplicationApi} from '../../../@core/backend/common/api/application.api'
import {studentnotes} from '../../user/studentnotes.component';
import {NbDialogService } from '@nebular/theme';
import { NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { Data } from '../../../../assets/data/data';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '../../../@core/interfaces/common/users';
import { takeUntil } from 'rxjs/operators';
//import {Message} from 'primeng/components/common/api';

@Component({
  selector: 'ngx-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  Countries: any [];
  q: number = 1;
  p: number = 1;

  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();

  public filterText1: string;
  public filterPlaceholder1: string;
  public filterInput1 = new FormControl();

  searchForm:FormGroup;
  date : Date = new Date();
  max = new Date();
  date1 : any;
  Details: any;
  fileName: any;
  data :any;
  DetailRes: any;
  activityData: any;
  activity_total: any;
  studentdata: any;
  studentLength: any;
  active: any;
  dateForm:FormGroup;
  dateRange: any;
  endDate: any;
  startDate: any;
  isLoadingResults: boolean = false;
  tab_type: string;
  Total_data: any;
  loadingXL: boolean;
  protected readonly unsubscribe$ = new Subject<void>();
  admin: any;
  userId: string;

  constructor(
    private formBuilder:FormBuilder,
    protected api: ApplicationApi,
    public dialogservice: NbDialogService,
    public toasterService: NbToastrService,
    private globalVar : Data,
    private router : Router,
    private route: ActivatedRoute,
    private usersService: UserData
  ) { 
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
    this.userId = this.route.snapshot.queryParamMap.get('userId');
  }

  ngOnInit(): void {
    this.refresh('','')
    this.refreshdata('','')
    this.refreall('','',''),
    this.getpaymentErrorDetails();
    this.getpaymentresolve();
    this.tab('');
  
    
    this.searchForm = this.formBuilder.group({
      idCtrl:[''],
      dateCtrl : [''],
      emailCtrl : [''],
      nameCtrl:[''],
      pendingdateCtrl:[''],
      pendingemailCtrl:[''],
      
    })
    this.dateForm = this.formBuilder.group({
      totaldateCtrl:['']
    })

    this.filterText1 = "";
    this.filterPlaceholder1 = "Search";
    this.filterText = "";
    this.filterPlaceholder = "Local Search";
    this.tab_type = '1stPayment';
      this.isLoadingResults = true;
      this.api.getPaymentDetails('1stPayment').subscribe(data=>{

        this.isLoadingResults = false;
        this.Total_data = data['data'];
        
      });
    this.filterInput1
      .valueChanges
      //.debounceTime(200)
      .subscribe(term => {
      this.filterText1 = term;
    });
   
  }
  tab(e) {
    var index = e.index;
    // this.msgs = [];
    if(index == 0){
      this.tab_type = '1stPayment';
      this.isLoadingResults = true;
      this.api.getPaymentDetails('1stPayment').subscribe(data=>{
        this.isLoadingResults = false;
        this.Total_data = data['data'];
      });
    }else if(index == 1){
      this.tab_type = '1stRefund';
			this.isLoadingResults = true;
			this.api.getPaymentDetails('1stRefund').subscribe(data=>{
				this.isLoadingResults = false;
				this.Total_data = data['data'];
			});
    }
  }

  search(){
  
     if(this.searchForm.controls.pendingdateCtrl.value || this.searchForm.controls.pendingemailCtrl.value){
      var date = this.searchForm.controls.pendingdateCtrl.value
  
      this.searchForm.controls.pendingdateCtrl.setValue(date);
    this.refresh(this.searchForm.controls.pendingdateCtrl.value, this.searchForm.controls.pendingemailCtrl.value,);  
    this.refreshdata(this.searchForm.controls.pendingdateCtrl.value, this.searchForm.controls.pendingemailCtrl.value,);  

  }else{
      alert("Please specify any of the search criteria")
    }
  }
  refresh(date, email){
    
  //  this.isLoadingResults = true;
    this.api.getallpedingpayment(this.p, date, email,'inprocess').subscribe(data =>{
    
      //this.isLoadingResults = false;
      this.Details = data['items'];
      this.activity_total = data['total_count'];
    })
    this.filterInput
      .valueChanges
      //.debounceTime(200)
      .subscribe(term => {
       this.filterText = term;
    });
  }
  refreshdata(date, email){
  //  this.isLoadingResults = true;
    this.api.getallpedingpayment(this.p, date, email,'resolved').subscribe(data =>{
    
      //this.isLoadingResults = false;
      this.DetailRes = data['items'];
     this.activity_total = data['total_count'];
    })
    this.filterInput
      .valueChanges
      //.debounceTime(200)
      .subscribe(term => {
       this.filterText = term;
    });
  }
  getpaymentErrorDetails(){

    this.api.getPaymentdeatils('inprocess').subscribe(data => {
      if(data['status'] ==  200 ){
        
      this.Details = data['getPaymentdeatils']
      }else{

      }
 });
  }

  showNotes(notes){
    
    
    this.dialogservice.open(studentnotes, {
      context: {
           type:'notes',
           notes : notes
      },
    }).onClose.subscribe(data=>{
     // this.getapplication()
    })

  }
  verify(id,email){
  
    this.api.setResolve(id,email,'guverification').subscribe((data: any) => {
      
          if(data['status'] ==  200){
            this.toasterService.success('Application set to Rsovled and Mail send to Student ');
            this.getpaymentErrorDetails();
            this.getpaymentresolve();
            // this.refresh(this.application_id,this.student_name, this.email);
          }
        })
  }
  getpaymentresolve(){

    this.api.getPaymentdeatils('resolved').subscribe(data => {
      if(data['status'] ==  200 ){
        
      this.DetailRes = data['getPaymentdeatils']
      

        
      }else{

      }
   });
  }

  searchtotal(){
    if(this.searchForm.controls.idCtrl.value || this.searchForm.controls.nameCtrl.value || this.searchForm.controls.emailCtrl.value){
      this.refreall(this.searchForm.controls.idCtrl.value,this.searchForm.controls.nameCtrl.value,this.searchForm.controls.emailCtrl.value);
    }else{
      alert("Please specify any of the search criteria")
    }
  }
 refreall(application_id,student_name, email){
  
  this.isLoadingResults = true;
  
  this.api.getAll_Paydetails(this.p,application_id,student_name,email).subscribe(data =>{
    this.isLoadingResults = false;
    this.studentdata = data['items'];
    
    this.studentLength = data['total_count'];
    // this.active=data['counts'];
  })
  this.filterInput
    .valueChanges
    //.debounceTime(200)
    .subscribe(term => {
     this.filterText = term;
  });
 }

  pageChanged(q){
    this.q = q;
    this.globalVar.ViewpageValue=q;
    this.refreall(this.searchForm.controls.idCtrl.value,this.searchForm.controls.nameCtrl.value,this.searchForm.controls.emailCtrl.value);
  }

  downloadExcel(tabtype){
    this.loadingXL = true;
    this.dateRange= this.dateForm.controls.totaldateCtrl.value
    this.endDate = (this.dateRange) ? moment(new Date(this.dateRange.end)).format("YYYY-MM-DD") : '';
    this.startDate = (this.dateRange) ? moment(new Date(this.dateRange.start)).format("YYYY-MM-DD"): '';
    this.api.downloadExcel_dateTotal('Total',tabtype,this.startDate,this.endDate).subscribe((response)=>{
      if(response[`status`] == 200){
        this.api.downloadFilespaymenttotal(response[`data`])
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

}
