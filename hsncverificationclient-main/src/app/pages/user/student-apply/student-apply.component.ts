import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationApi } from '../../../@core/backend/common/api/application.api';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbToastrService,NbDialogService,NbTagComponent, NbTagInputAddEvent,NbDatepickerDirective} from '@nebular/theme';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ThirdPartyApplicationsApi } from '../../../@core/backend/common/api/thirdPartyApplications.api';
import { FileUploadService } from '../../../@core/backend/common/services/file-upload.service';
import { User, UserData } from '../../../@core/interfaces/common/users';
import { UserStore } from '../../../@core/stores/user.store';
import { Firstpaymentdialog } from '../../student-verification/payment_dialog/paymentdialog';
import { SharedService } from '../../../@core/backend/common/services/shared.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'ngx-student-application',
  templateUrl: './student-apply.component.html',
  styleUrls: ['./student-apply.component.scss']
})
export class StudentApplyComponent implements OnInit {

  protected readonly unsubscribe$ = new Subject<void>();
  errataFlag:Boolean=false;
  role: any;
  user: User;
  id: number;
  date = new Date();
  verifyGroup: FormGroup;
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
  chooseFlag:boolean=false;
  file_path: any;
  @ViewChild(NbDatepickerDirective, { static: false }) nbDatepicker;


  constructor(private fb: FormBuilder,
    private api: ApplicationApi, 
    private userStore: UserStore,
    private agentapi: ThirdPartyApplicationsApi,
    private toastrService: NbToastrService,
    private NbDialogService: NbDialogService,
    public fileUploadService: FileUploadService,
    private usersService: UserData,
    private router: Router,
    private sharedService: SharedService
  ) {
  }

  ngOnInit(): void {

  //   setTimeout(()=>{                           // <<<---using ()=> syntax
  //     this.nbDatepicker.hidePicker()
  // }, 3000);

    this.verifyGroup = this.fb.group({
      firstNameCtrl: ['', [Validators.required]],
      lastNameCtrl: ['', [Validators.required]],
      seatCtrl: ['', [Validators.required]],
      emailCtrl: ['', [ ]],
      branchCtrl: ['', [Validators.required]],
      semCtrl: ['', [Validators.required]],
      docCtrl: ['', [Validators.required]],
      reqCtrl: ['', [Validators.required]],
      collegeCtrl: ['', [Validators.required]],
      passCtrl: ['', [Validators.required]],
      streamCtrl: ['', [Validators.required]],
      fileCtrl: ['', [Validators.required]],
    });


    this.sharedService.userErrata.subscribe((message) => {
      var set = new Set(message[0]['email'])
      this.chooseFlag = true;
      this.app_id = message[0]['id']
      this.errataFlag=true;
      this.file_path = message[0]['choose_file']
      this.verifyGroup.controls.firstNameCtrl.setValue(message[0]['first_name']);
      this.verifyGroup.controls.lastNameCtrl.setValue(message[0]['last_name']);
      this.verifyGroup.controls.seatCtrl.setValue(message[0]['seat_number']);
      this.emails = set;
      this.tagFlag = true;
      this.verifyGroup.controls.branchCtrl.setValue(message[0]['branch']);
      this.verifyGroup.controls.semCtrl.setValue(message[0]['semester']);
      this.verifyGroup.controls.docCtrl.setValue(message[0]['document']);
      this.verifyGroup.controls.reqCtrl.setValue(message[0]['request_type']);
      this.verifyGroup.controls.collegeCtrl.setValue(message[0]['college_name']);
      this.verifyGroup.controls.passCtrl.setValue(message[0]['year_passing']);
      this.verifyGroup.controls.streamCtrl.setValue(message[0]['stream']);
    })
    if (this.userStore.getUser() == undefined) {

      this.usersService.getCurrentUser().pipe(takeUntil(this.unsubscribe$))
        .subscribe((user) => {
          this.id = this.user.id;
          this.user = user;
          this.role = user.role;
          this.email = this.user.email;

        });

      this.userStore.onUserStateChange()
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((user: User) => {
          this.id = user.id;
          this.user = user;
          this.role = user.role;
          this.email = this.user.email;

        });

    } else {
      this.user = this.userStore.getUser();
      this.id = this.user.id;
      this.role = this.user.role;
      this.email = this.user.email;
      this.verifyGroup.controls.firstNameCtrl.setValue(this.user['firstName']);
      this.verifyGroup.controls.lastNameCtrl.setValue(this.user['lastName']);
      if (this.role == 'agent') {
        this.router.navigate(['pages/agent-dashboard']);
      }
    }



    if(this.emails.size == 0){
      this.tagFlag = false;
    }




  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
   // this.sharedService.messageSource.unsubscribe();
  }


  get p() {
    return this.verifyGroup.controls;
  }
  get f() {
    return this.verifyGroup.controls;
  }

  submit(): void {
    this.verifyGroup.controls.seatCtrl.markAsDirty();
    this.verifyGroup.controls.branchCtrl.markAsDirty();
    this.verifyGroup.controls.semCtrl.markAsDirty();
    this.verifyGroup.controls.docCtrl.markAsDirty();
    this.verifyGroup.controls.reqCtrl.markAsDirty();
    this.verifyGroup.controls.collegeCtrl.markAsDirty();
    this.verifyGroup.controls.passCtrl.markAsDirty();
    this.verifyGroup.controls.streamCtrl.markAsDirty();
    this.verifyGroup.controls.fileCtrl.markAsDirty();
    if (this.verifyGroup.valid && this.emails.size > 0) {
      var finalmail = this.emails
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
      };
      this.api.addApplication(this.verifyData,finalmail).subscribe(data => {
        if (data['status'] == 200) {
          this.app_data = data['data'];         
          this.emails.clear();
          this.addFlag=false;
          this.fileUploadService
          .addUser(this.app_data.id, this.files[0],false)
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
                this.toastrService.success('Details Saved Succesfully', 'Status');
                setTimeout(() => {
                  this.progress = 0;
                }, 500);
            }
          });
          this.sharedService.usermessageSource.next('applied');
          this.ngOnInit();
          this.app_id = this.app_data.id;
          this.app_email = this.app_data.email;
          this.app_name = this.app_data.first_name + ' ' + this.app_data.last_name;
          this.showpayment = false;

        } else {
          this.toastrService.danger('Error : Saving Details', 'Status');
        }
      });
    } else {
      const invalid = [];
      const controls = this.verifyGroup.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }
      this.toastrService.danger('Error :'+invalid, 'Status');
    }
  }

  update(app_id): void {
    this.chooseFlag=false;

    this.app_id = app_id;
    this.verifyGroup.controls.firstNameCtrl.markAsDirty();
    this.verifyGroup.controls.lastNameCtrl.markAsDirty();
    this.verifyGroup.controls.seatCtrl.markAsDirty();
    this.verifyGroup.controls.branchCtrl.markAsDirty();
    this.verifyGroup.controls.semCtrl.markAsDirty();
    this.verifyGroup.controls.docCtrl.markAsDirty();
    this.verifyGroup.controls.reqCtrl.markAsDirty();
    this.verifyGroup.controls.collegeCtrl.markAsDirty();
    this.verifyGroup.controls.passCtrl.markAsDirty();
    this.verifyGroup.controls.streamCtrl.markAsDirty();
    if(this.verifyGroup.controls.fileCtrl.value == ''){
      this.verifyGroup.controls.fileCtrl.clearValidators();
      this.verifyGroup.controls.fileCtrl.updateValueAndValidity();
    }
    if (this.verifyGroup.valid && this.emails.size > 0) {
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
      };
      this.verifyData.userId = this.user.id;
      this.api.updateApplication(this.app_id,this.verifyData,this.emails).subscribe(data => {
        if (data['status'] == 200) {
          this.toastrService.success('Details Saved Succesfully', 'Status');
          this.app_data = data['data'];       
          this.fileUploadService
          .addUser(this.app_data.id, this.files[0],true)
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
                this.toastrService.success('File Uploaded successfully', 'Status');
                setTimeout(() => {
                  this.progress = 0;
                }, 1500);
            }
          });
          this.sharedService.usermessageSource.next('errata');
          this.ngOnInit();
          this.verifyGroup.reset();
  
          this.emails.clear();
          this.addFlag=false;
          this.tagFlag=false;
          this.verifyGroup.controls.streamCtrl.setValue('');
          this.verifyGroup.controls.branchCtrl.setValue('');
          this.verifyGroup.controls.semCtrl.setValue('');
          this.verifyGroup.controls.docCtrl.setValue('');
          this.verifyGroup.controls.reqCtrl.setValue('');
          this.verifyGroup.controls.collegeCtrl.setValue('');
          this.app_id = this.app_data.id;
          this.app_email = this.app_data.email;
          this.app_name = this.app_data.first_name + ' ' + this.app_data.last_name;
          this.showpayment = false;
        } else {
          this.toastrService.danger('Error : Saving Details', 'Status');
        }
      });


    } else {
      const invalid = [];
      const controls = this.verifyGroup.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
      }
      this.toastrService.danger('Error :'+invalid, 'Status');
    }

  }

  reset(formDirective: FormGroupDirective) {
    this.verifyGroup.reset();
  
    this.emails.clear();
    this.addFlag=false;
    this.tagFlag=false;
    formDirective.resetForm();
    this.verifyGroup.controls.streamCtrl.setValue('');
    this.verifyGroup.controls.branchCtrl.setValue('');
    this.verifyGroup.controls.semCtrl.setValue('');
    this.verifyGroup.controls.docCtrl.setValue('');
    this.verifyGroup.controls.reqCtrl.setValue('');
    this.verifyGroup.controls.collegeCtrl.setValue('');
  }


  uploadFile(event) {
      const file = (event.target as HTMLInputElement).files[0];
      if(file.size / 1024 / 1024 > 5){
        this.verifyGroup.controls.fileCtrl.setValue('');
        this.toastrService.danger("File Size cannot be greater than 5 MB","Error");
      }else  if(file.type != 'application/pdf'){
        this.verifyGroup.controls.fileCtrl.setValue('');
        this.toastrService.danger("only pdf is allowed","Error");
      }else{
        this.files.push(file);
      }
  }
  onTagRemove(tagToRemove: NbTagComponent): void {
    this.emails.delete(tagToRemove.text)
    if(this.emails.size == 0 ){
      this.tagFlag=false;
    }
  }

  onTagAdd(){
    this.tagFlag=true;
    var mail=this.verifyGroup.controls.emailCtrl.value;
    if(this.emails.size > 4){
      this.toastrService.danger("Cannot exceed more than 5 emails.","Error");
        }else{
          if(this.validateEmail(mail)){
          
          if(this.emails.has(mail)){
            this.toastrService.danger("Cannot add "+mail+" as it is already in the email list.","Error")
          }
          var value = this.emails.add(mail)
          this.verifyGroup.controls.emailCtrl.setValue('');
        }else{
          this.toastrService.danger('Please add correct email','Error')
        }
        }
  }
  validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    readFile(fileEvent) {
      const file = (event.target as HTMLInputElement).files[0];
     if(file.size / 1024 / 1024 > 5){
        this.verifyGroup.controls.fileCtrl.setValue('');
        this.toastrService.danger("File Size cannot be greater than 5 MB","Error");
      }
      if(file.type != 'application/pdf'){
        this.verifyGroup.controls.fileCtrl.setValue('');
        this.toastrService.danger("only pdf is allowed","Error");
      }
   }
  //  dateChange = (date) => {
  // }
  focusFunction(){
    this.addFlag=true;
  }

  focusOutFunction(){
    this.addFlag=true;

  }

  openDocument(){
      window.open(this.file_path, '_blank')
  
}
}
