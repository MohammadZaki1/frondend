import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {ApplicationApi} from '../../../@core/backend/common/api/application.api';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { SubAdminRolesComponent } from './manageroles';
import { AddSubAdminComponent } from './addSubAdmin.component';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '../../../@core/interfaces/common/users';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'ngx-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {

  public filterInput = new FormControl();
  public filterText: string;
  public filterPlaceholder: string;
  p: number = 1;
  subadmindata: any;
  active: any;
  searchForm:FormGroup;
  email: any;
  name: any;
  protected readonly unsubscribe$ = new Subject<void>();
  admin: any;
  userId: string;

  constructor(
    private api: ApplicationApi,
    public toasterService: NbToastrService,
    private dialogService: NbDialogService,
    private formBuilder:FormBuilder,
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

  ngOnInit() {
    this.filterText = "";
    this.filterPlaceholder = "Search";
    this.getRoleManagementData('','');
    this.filterInput
      .valueChanges
      //.debounceTime(200)
      .subscribe(term => {
      this.filterText = term;
    });
    this.searchForm = this.formBuilder.group({
      nameCtrl:[''],
      emailCtrl:[''],
    })
  }

  getRoleManagementData(name,email){
    this.api.getallsubadmin(this.p,name,email).subscribe((data)=>{
      this.subadmindata = data['data'];
      this.active=data['counts'];
    })
  }

  pageChanged(event){
    this.p = event;
    this.getRoleManagementData(this.searchForm.controls.nameCtrl.value,this.searchForm.controls.emailCtrl.value);
  }

  viewMore(userId){
    this.dialogService.open(SubAdminRolesComponent,{ 
      context: {
        userid : userId
      }
     }).onClose
        .subscribe(
          (data: any) => {
            this.ngOnInit();
            err => console.error(err)
        });
  }

  modifyString(array){
  
    var arr=[];
    array.forEach(element => {
     
      if(element == 'admindashboard'){
        arr.push("Admin Dashboard")
      }else  if(element == 'studentmanagement'){
        arr.push("Student Management")
      }else if(element == 'collegeManagement'){
        arr.push("College Management")
      }else if(element == 'adminTotal'){
        arr.push("Total Applications")
      }else if(element == 'adminPending'){
        arr.push("Pending Applications")
      }else if(element == 'adminVerified'){
        arr.push("Verified Applications")
      }else if(element == 'adminSigned'){
        arr.push("Signed Applications")
      }else if(element == 'adminWesApp'){
        arr.push("Wes Application")
      }else if(element == 'adminEmailed'){
        arr.push("Emailed Application")
      }else if(element == 'adminpayment'){
        arr.push("Payment")
      }else if(element == 'adminReport'){
        arr.push("Report")
      }else if(element == 'studentfeedback'){
        arr.push("Student Feedback")
      }else if(element == 'help'){
        arr.push("Help")
      }
      
    });
     
    return arr.join(', ');
  }

  addNewSubAdmin(userId){
    this.dialogService.open(AddSubAdminComponent,{ 
      context: {
        userId : userId
      }
    }).onClose
    .subscribe((data: any) => {
      if(data.status == "add"){
        this.viewMore(data.id);
      }else{
        this.ngOnInit();
      }
    });
  }

  changeSubAdminStatus(id){
    this.api.changeSubAdminStatus(id).subscribe(data=>{
      if(data['status'] == 200){
        this.toasterService.success('User status changed','Change Status');
        this.ngOnInit();
      }else{
        this.toasterService.success('User status not changed' ,'Change Status');
      }
    })
  }

  search(){
    // var p;
    // if(type == 'new'){
    //   p = this.p;
    // }

    if(this.searchForm.controls.nameCtrl.value || this.searchForm.controls.emailCtrl.value){
      this.getRoleManagementData(this.searchForm.controls.nameCtrl.value,this.searchForm.controls.emailCtrl.value);
    }else{
      this.getRoleManagementData('','');
    }
  }


}
