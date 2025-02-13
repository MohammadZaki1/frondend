
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ApplicationApi } from '../../@core/backend/common/api/application.api';
import { UserStore } from '../../@core/stores/user.store';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User, UserData } from '../../@core/interfaces/common/users';
import { NbDatepickerDirective, NbToastrService } from '@nebular/theme';
import {Firstpaymentdialog } from './payment_dialog/paymentdialog'
import { NbDialogService } from '@nebular/theme';
import { ThirdPartyApplicationsApi } from '../../@core/backend/common/api/thirdPartyApplications.api';
import { FileUploadService } from '../../@core/backend/common/services/file-upload.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-student-verification',
  templateUrl: './student-verification.component.html',
  styleUrls: ['./student-verification.component.scss']
})
export class StudentVerificationComponent implements OnInit,OnDestroy {

  protected readonly unsubscribe$ = new Subject<void>();
  role: any;
  user: User;  
  id:number;
  date = new Date();
  verifyGroup: FormGroup;
  // verifyData: {
  //   firstname: any; lastname: any; seat: any; semester: any; email: Set<any>; Document: any; reqType: any; college: any; branch: any; passing: any; stream: any; userId: any; userEmail: any; created_by: any;
  // };
  verifyData: {
    firstname: any; lastname: any; seat: any; semester: any;  Document: any; reqType: any; college: any; branch: any; passing: any; stream: any; userId: any; userEmail: any; created_by: any;
  };


  selectedOption: any;
  readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ref: any;
  files = [];
  email;
  app_data;
  showpayment = true;
  app_id;
  app_email;
  app_name;
  //switch ui
  uiFlag: boolean = false;
  progress: number = 0;
  emails = new Set();
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  addFlag:boolean=false;
  tagFlag:boolean=false;
  @ViewChild(NbDatepickerDirective, { static: false }) nbDatepicker;




  constructor(private fb: FormBuilder,
    private api: ApplicationApi,private userStore: UserStore,
    private agentapi: ThirdPartyApplicationsApi,
    private toastrService: NbToastrService,
    private NbDialogService: NbDialogService,
    public fileUploadService: FileUploadService,
    private usersService: UserData,
    private router: Router,
   
  ) {
  
  }

  ngOnInit(): void {
   
if(this.userStore.getUser() == undefined){


this.usersService.getCurrentUser().pipe(takeUntil(this.unsubscribe$))
.subscribe((user) => { 
      this.id=this.user.id;
      this.user = user;
      this.role= user.role;
      this.email = this.user.email;
      //route to fetch application details
  // this.api.checkApplication(this.email).subscribe(data => {
  //   if (data['status'] == 200) {
  //     this.uiFlag=data['application']
  //     if(this.uiFlag){
  //       this.router.navigate(['pages/application']);
  //     }
  //   }
  // });
})

    this.userStore.onUserStateChange()
    .pipe(
      takeUntil(this.unsubscribe$),
    )
    .subscribe((user: User) => {
      this.id=user.id;
      this.user = user;
      this.role= user.role;
      this.email = this.user.email;
      
    });
  
}else{
  this.user=this.userStore.getUser();
  this.id=this.user.id;
  this.role=this.user.role;
  this.email=this.user.email;

  //route to fetch application details
  // this.api.checkApplication(this.email).subscribe(data => {
  //   if (data['status'] == 200) {
  //     this.uiFlag=data['application']
  //     if(this.uiFlag){
  //       this.router.navigate(['pages/application']);
  //     }
  //   }
  // });


  if(this.role == 'admin'){
    this.router.navigate(['pages/dashboard']);
  }
  if(this.role == 'agent'){
    this.router.navigate(['pages/agent-dashboard']);
  }
}
    

  



    this.verifyGroup = this.fb.group({
      firstNameCtrl: ['', [Validators.required]],
      lastNameCtrl:['', [Validators.required]],
      seatCtrl: ['', [Validators.required]],
      emailCtrl: ['', [Validators.required, Validators.pattern(this.emailValidate)]],
      branchCtrl: ['', [Validators.required]],
      semCtrl: ['', [Validators.required]],
      docCtrl: ['', [Validators.required]],
      reqCtrl: ['', [Validators.required]],
      collegeCtrl: ['', [Validators.required]],
      passCtrl: ['', [Validators.required]],
      streamCtrl: ['', [Validators.required]],
      fileCtrl: ['', [Validators.required]],
      

   

    })

    


  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  get p() {
    return this.verifyGroup.controls;
  }
  get f() {
    return this.verifyGroup.controls;
  }

 


  submit(): void {
    this.verifyGroup.controls.firstNameCtrl.markAsDirty();
    this.verifyGroup.controls.lastNameCtrl.markAsDirty();
    this.verifyGroup.controls.seatCtrl.markAsDirty();
    this.verifyGroup.controls.emailCtrl.markAsDirty();
    this.verifyGroup.controls.branchCtrl.markAsDirty();
    this.verifyGroup.controls.semCtrl.markAsDirty();
    this.verifyGroup.controls.docCtrl.markAsDirty();
    this.verifyGroup.controls.reqCtrl.markAsDirty();
    this.verifyGroup.controls.collegeCtrl.markAsDirty();
    this.verifyGroup.controls.passCtrl.markAsDirty();
    this.verifyGroup.controls.streamCtrl.markAsDirty();
    this.verifyGroup.controls.fileCtrl.markAsDirty();

    if (this.verifyGroup.valid) {

      this.verifyData = {
        firstname: this.verifyGroup.controls.firstNameCtrl.value,
        lastname: this.verifyGroup.controls.lastNameCtrl.value,
        seat: this.verifyGroup.controls.seatCtrl.value,
        branch: this.verifyGroup.controls.branchCtrl.value,
        semester: this.verifyGroup.controls.semCtrl.value,
        Document: this.verifyGroup.controls.docCtrl.value,
        reqType: this.verifyGroup.controls.reqCtrl.value,
        college: this.verifyGroup.controls.collegeCtrl.value,
        passing: this.verifyGroup.controls.passCtrl.value,
        stream: this.verifyGroup.controls.streamCtrl.value,
        userId: this.user.id,
        userEmail: this.user.email,
        created_by: 'student'
      }
      this.api.addApplication(this.verifyData,this.emails).subscribe(data => {
        if (data['status'] == 200) {
          this.toastrService.success('Details Saved Succesfully', 'Status',)
          this.app_data = data['data'];
          this.app_id = this.app_data.id;
          this.app_email = this.app_data.email;
          this.app_name = this.app_data.first_name +' '+ this.app_data.last_name;
          this.showpayment = false;
          this.router.navigate(['/pages/application']);


         
        } else {
          this.toastrService.danger('Error : Saving Details', 'Status',)
        }
      })
      

    } else {
      this.toastrService.danger('Error : Incomplete Fields', 'Status',)
    }

  }



  reset(formDirective: FormGroupDirective){
this.verifyGroup.reset();
formDirective.resetForm();
  }


  // proceedforpayment(){
  //   this.NbDialogService.open(Firstpaymentdialog, {
  //     context: {
  //       app_id : this.app_id,
  //       app_email: this.app_email,
  //       app_name: this.app_name,
  //     }
  //   })
    
  // }

  
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.fileUploadService
      .addUser(this.user.id, file,false)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            break;
          case HttpEventType.ResponseHeader:
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round((event.loaded / event.total) * 100);
            break;
          case HttpEventType.Response:
            this.toastrService.success('File Uploaded successfully', 'Status',)
            setTimeout(() => {
              this.progress = 0;
            }, 1500);
        }
      });
  }


}
