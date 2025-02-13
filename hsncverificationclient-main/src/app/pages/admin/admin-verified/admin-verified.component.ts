import { Component, OnInit } from '@angular/core';
import { ApplicationApi } from '../../../@core/backend/common/api/application.api';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';
import { Router,ActivatedRoute } from '@angular/router';
// import { CountriesService } from '../../@core/data/countries.service';
// import { CountriesService } from '../../@core/data/countries.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { UserData } from '../../../@core/interfaces/common/users';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { saveAs } from 'file-saver';



// import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-admin-verified',
  templateUrl: './admin-verified.component.html',
  styleUrls: ['./admin-verified.component.scss']
})
export class AdminVerifiedComponent implements OnInit {
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
  userId : any;
  student_name: any;
  protected readonly unsubscribe$ = new Subject<void>();
  admin: any;
  loader : Boolean = false;
  startDate: string;
  endDate: string;

  constructor(  private api: ApplicationApi, 
    private authService : NbAuthService,
    private router : Router,
    // protected countries :CountriesService,
    public toasterService: NbToastrService,
    private route: ActivatedRoute,
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
      this.userId = this.route.snapshot.queryParamMap.get('userId');

   }

  ngOnInit() {
    this.filterText = "";
    this.filterPlaceholder = "Local Search";
    this.refresh(null,null);
    this.searchForm = this.formBuilder.group({
      nameCtrl:[''],
      emailCtrl:['']
      // idCtrl : [''],
    })
  }

  handleClick(user_id,app_id) {
    this.router.navigate(['pages/adminView'],{queryParams:{userId : user_id, app_id : app_id, viewFrom : 'total'}});
  }
  
  pageChanged(event){
    this.p = event;
    this.refresh(this.searchForm.controls.nameCtrl.value,this.searchForm.controls.emailCtrl.value);
  }

  search(){

  }
  refresh(student_name, email){
    this.student_name = student_name;
    
    this.isLoadingResults = true;
    this.api.getAll_verifiedApplications(this.p,student_name,email).subscribe(data =>{
      this.isLoadingResults = false;
      this.studentdata = data['items'];
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
    this.loader = true;
    this.api.generateCertificate(userId,app_id,this.admin.email).subscribe((data: any) => {
      if(data['status'] ==  200){
        this.loader = false;
        this.toasterService.success('Application ' + app_id + 'verifed successfully');
        this.refresh(this.student_name, this.email);
      }
    })
  }

  downloadExcel(){
    this.api.downloadExcel('verified' ,'accept',this.startDate,this.endDate).subscribe((response)=>{
      this.api.downloadFiles(response['data']).subscribe(data => {
        saveAs(data, data['data']) ;
      });
    })
  }
}
