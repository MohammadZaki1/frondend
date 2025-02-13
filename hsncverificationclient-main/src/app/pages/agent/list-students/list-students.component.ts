import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ThirdPartyApplicationsApi } from '../../../@core/backend/common/api/thirdPartyApplications.api';
import { UserData } from '../../../@core/interfaces/common/users';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
  
})
export class ListStudentsComponent implements OnInit {

  p: number = 1;
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  searchForm:FormGroup;
  name : string;
  email : string;
  studentLength : any;
  isLoadingResults: boolean = false;
  studentdata: any;
  user: any;
  protected readonly unsubscribe$ = new Subject<void>();

  constructor(
    private agentApi: ThirdPartyApplicationsApi,
    private router : Router,
    public toasterService: NbToastrService,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder,
    private usersService: UserData,
  ) { 
    this.usersService.getCurrentUser().pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        this.user = user;
        if(this.user.is_email_verified == true && this.user.is_otp_verified == true){
          if(this.user.role != 'agent'){
            this.router.navigate(['auth/logout']);
          }
        }else{
          this.router.navigate(['auth/logout']);
        }
      })
  }

  ngOnInit(): void {
    this.filterText = "";
    this.filterPlaceholder = "Local Search";
    this.refresh(null,null);
    this.searchForm = this.formBuilder.group({
      nameCtrl:[''],
      emailCtrl:['']
      // idCtrl : [''],
    })
  }

  refresh(student_name, email){
   this.isLoadingResults = true;
    this.agentApi.getAllStudents(this.p,student_name,email).subscribe(data =>{
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

  editStudentDetails(user_id){
    this.router.navigate(['pages/agentAddStudent'],{queryParams:{user_id : user_id}});
  }
  
  editStudentApplication(user_id,type){
    if(type == 'edit'){
      this.router.navigate(['pages/agentAddApplication/'+user_id]);
    }else if(type == 'view'){
      this.router.navigate(['pages/viewApplication/'+user_id]);
    }
  }

  addNew(){
    this.router.navigate(['pages/agentAddStudent']);
  }

  delete(user_id){

  } 

  pageChanged(event){

  }

  search(){

  }
}
