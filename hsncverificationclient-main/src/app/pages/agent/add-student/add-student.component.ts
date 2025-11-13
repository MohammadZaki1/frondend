import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMAIL_PATTERN } from '../../../@auth/components/constants';
import { ThirdPartyApplicationsApi } from '../../../@core/backend/common/api/thirdPartyApplications.api';
import { UserData } from '../../../@core/interfaces/common/users';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbToastrService } from '@nebular/theme';
import { RegisterUserApi } from '../../../@core/backend/common/api/registerUser.api';

@Component({
  selector: 'ngx-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  minmobileLength:number = 10;
  maxmobileLength:number = 10;

  minNameLength:number = 2;
  maxNameLength:number = 20;

  readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  addStudentForm: FormGroup;
  errorMessage: string;
  user_id: string;
  agent: any;
  emailExists: boolean;
  emailcheck: any;
  protected readonly unsubscribe$ = new Subject<void>();

  constructor(
  private fb: FormBuilder,
  private usersService: UserData,
  protected router: Router,
  protected route : ActivatedRoute,
  private agentApi: ThirdPartyApplicationsApi,
  private registerApi : RegisterUserApi,
  private toasterService : NbToastrService) { 
    this.user_id = this.route.snapshot.queryParamMap.get('user_id');
    this.usersService.getCurrentUser().pipe(takeUntil(this.unsubscribe$))
    .subscribe((user) => {
      this.agent = user;
      if(this.agent.is_email_verified == true && this.agent.is_otp_verified == true){
        if(this.agent.role != 'agent'){
          this.router.navigate(['auth/logout']);
        }
      }else{
        this.router.navigate(['auth/logout']);
      }
    })
  }

  ngOnInit(): void {
    this.addStudentForm = this.fb.group({
      firstName: ['',[Validators.required,Validators.minLength(this.minNameLength),Validators.maxLength(this.maxNameLength)]],
      lastName: ['',[Validators.required,Validators.minLength(this.minNameLength),Validators.maxLength(this.maxNameLength)]],
      fullName: ['',[Validators.required]],
      mobile: ['',[Validators.required,Validators.minLength(this.minmobileLength),Validators.maxLength(this.maxmobileLength)]],
      email: ['',[Validators.required,Validators.pattern(this.emailValidate)]]
    });
    if(this.user_id){
      this.agentApi.getStudentDetails(this.user_id).subscribe(data=>{
        if(data['status'] == 200){
          this.addStudentForm.controls.firstName.setValue(data['data'].name);
          this.addStudentForm.controls.lastName.setValue(data['data'].surname);
          this.addStudentForm.controls.fullName.setValue(data['data'].marksheetName);
          this.addStudentForm.controls.mobile.setValue(data['data'].mobile);
          this.addStudentForm.controls.email.setValue(data['data'].email);
        }
      })
    }
    
    


  }

  addStudentDetails(){
    this.errorMessage = '';
    this.addStudentForm.controls.firstName.markAsDirty();
    this.addStudentForm.controls.lastName.markAsDirty();
    this.addStudentForm.controls.fullName.markAsDirty();
    this.addStudentForm.controls.mobile.markAsDirty();
    this.addStudentForm.controls.email.markAsDirty();

    if(this.addStudentForm.valid){
      if(this.emailExists === true){
        this.toasterService.show('Email id is already exist','danger', { 'duration':3000} );
      }else{
        this.agentApi.addStudent(this.addStudentForm.value).subscribe(data=>{
          if(data['status'] == 200){
            this.router.navigate(['pages/agentAddApplication/'+data['data'].id]);
            this.toasterService.success("Student added successfully")
          }
        })
      }
    }else{
      this.toasterService.danger("Please fill all the data")
      this.errorMessage = "FIll ALL DETAILS";
    }
  }

  editStudentDetails(){
    if(this.addStudentForm.valid){
      var user = this.addStudentForm.value;
      this.agentApi.editStudent(user,this.user_id).subscribe(data=>{
        if(data['status'] == 200){
          this.router.navigate(['pages/agentAddApplication/'+this.user_id]);
          this.toasterService.success("Student edited successfully");
        }
        if(this.user_id){
          this.agentApi.getStudentDetails(this.user_id).subscribe(data=>{
            if(data['status'] == 200){
              this.addStudentForm.controls.firstName.setValue(data['data'].name);
              this.addStudentForm.controls.lastName.setValue(data['data'].surname);
              this.addStudentForm.controls.fullName.setValue(data['data'].marksheetName);
              this.addStudentForm.controls.mobile.setValue(data['data'].mobile);
              this.addStudentForm.controls.email.setValue(data['data'].email);
             
              // this.addStudentForm.controls.enrollmentNo.setValue(data['data'].course);
    
            }
          })
        }
      })
    }else{
      this.toasterService.danger("Please fill all the data")
      this.errorMessage = "FILL ALL DETAILS";
    }
  }

  onKeyPressNew(event:any){
    //this.user = this.addStudentForm.value;
    this.emailcheck= this.addStudentForm.controls.email.value;

    this.registerApi.emailValues(this.emailcheck)
    .subscribe(
      (data: any) => {
      if(data['status'] == 400){
        this.emailExists = true;
        this.addStudentForm.controls.email.markAsDirty();
        this.addStudentForm.updateValueAndValidity();
      } else{
        this.emailExists = false;
      }
      err => console.error(err)
    });


  }

}
