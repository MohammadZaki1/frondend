import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ApplicationApi } from '../../@core/backend/common/api/application.api';
// import { ApplicationProcessApi } from '../../@core/backend/common/api/applicationProcess.api';

// import { ConfirmationService, SharedModule, ConfirmDialogModule, InplaceDisplay} from 'primeng/primeng';
import {Router,ActivatedRoute} from '@angular/router';
import { NbToastrService, NbDialogService } from '@nebular/theme';
// import { ShowStepperforApp } from '../dashboard/ShowStepperforApp';
// import { applndetails } from './applndetails';
// import { AddAffiliationInstructionaldetails } from './AddInstitutionAffiliationDetails';
// import { transcriptpreview } from '../admin-dashboard/dialog/transcriptpreview.component';
// import { Addinstitutiondialog } from '../student/new-attestation/dialog/Addinstitutiondialog';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
// import { config } from '../../../../config';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
// import { UploadDocuments } from './uploadDocuments.component';
import { FormGroup, FormBuilder,FormArray, Validators, FormControl } from '@angular/forms';
import { UserStore } from '../../@core/stores/user.store';
import { ConfirmationService} from 'primeng/api';
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import { User, UserData } from '../../@core/interfaces/common/users';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OpenNoteBoxComponent } from './openNoteBox.component';
// import { DocumentViewer } from '../../../../../hsncverificationclient/src/app/pages/student-application/dialog/documentViewer.component';
import { DocumentViewer } from './dialog/documentViewer.component';
import { EditInsDetailsComponent } from "./edit-ins-details/edit-ins-details.component";
import { EditEduDetailsComponent } from './edit-edu-details/edit-edu-details.component';
@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers:[ConfirmationService,TabViewModule,TableModule],
})

export class ViewComponent implements OnInit {
  protected readonly unsubscribe$ = new Subject<void>();
  userId: any;
  type: any;
  viewFrom: string;
  personalDetails: any;
  verificationDetails: any;
  marksheetDetails: any;
  transcriptDetails: any;
  degreeDetails: any;
  deliveryOptions: any;
  marksheetInstituteDetails: any;
  transcriptInstituteDetails: any;
  degreeInstituteDetails: any;
  app_id: string;
  pdfImg: string = '../../../assets/images/pdf.png';
  display_first: boolean = false;
  display_second: boolean = false;
  marksheet: any;
  transcript: any;
  degree: any;
  admin: User;
 

  

  constructor(
   private api: ApplicationApi, 
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private usersService: UserData,
    private toasterService: NbToastrService,
    private router : Router,

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
 
  }

  ngOnInit() {
    this.viewFrom = this.route.snapshot.queryParamMap.get('viewFrom');
    this.userId = this.route.snapshot.queryParamMap.get('userId');
    this.app_id = this.route.snapshot.queryParamMap.get('app_id');
    this.getAdminDetails();

  }
    //this.getEducationDetails();
   // education details array
//    this.EducationalForm = this.fb.group({
//     educationarray : this.fb.array([]),
//  });
getAdminDetails(){
    this.api.getAdminSideDetails(this.userId,this.app_id).subscribe(data => {
      this.personalDetails = data['data']['personalDetails'];
      this.verificationDetails = data['data']['verificationDetails'];
      this.marksheetDetails = data['data']['marksheetDetails'];
      this.transcriptDetails = data['data']['transcriptDetails'];
      this.degreeDetails = data['data']['degreeDetails'];
      this.deliveryOptions = data['data']['deliveryOptions'];
      this.marksheetInstituteDetails = data['data']['marksheetInstitute'];
      this.transcriptInstituteDetails = data['data']['transcriptInstitute'];
      this.degreeInstituteDetails = data['data']['degreeInstitute'];
    });
  }

  switchErrata(event,id,user_id,type){
    if(event.checked == true){
      this.dialogService.open(OpenNoteBoxComponent,{
        context :{
          event : event.checked,
          type : type,
          document_id : id,
          app_id : this.app_id,
          user_id : this.userId,
        }
      }).onClose.subscribe(data=>{
        this.getAdminDetails();
      })
    }
    
  }





  imagePopup(imagename){
    this.dialogService.open(DocumentViewer, {
      context: {
      arr : imagename,
      user_id : this.userId
      },
    });
  }


  
  admin_pass_reset(email){
    var user_mail = email;
    if(user_mail==this.personalDetails.email)
    {
      this.api.admin_pass_reset(user_mail).subscribe(data=>{
        if(data['status'] == 200){
          this.toasterService.success('Password is Changed to 123456','Success');
        }else if(data['status']==400){
          this.toasterService.danger('Something is Wrong Please Contact The Admin','Error');
        }
      })
    }else {
      alert("Something is Wrong Please Contact The Admin");
    }
  }

  
  admin_name_change(){
    this.display_first = true;

  }



  name_change(fullname:string, email:string, contactno:string, marksheetname:string){
    this.userId=this.route.snapshot.queryParamMap.get('userId');
    var fullname = fullname.trim();
    var email = email.trim();
    var contactno = contactno.trim();
    var marksheetname = marksheetname.trim();
    if(fullname != '' && email != '' && contactno != '' && marksheetname != ''){
      this.api.name_changes(fullname, email, contactno, marksheetname, this.userId).subscribe(data=>{
        if(data['status'] == 200){
          this.toasterService.success('Name Changed Successfully','Success',{preventDuplicates: true});
          this.ngOnInit();
          this.display_first = false;
        }
        else{
          this.toasterService.danger('Something Went Wrong', 'Error', {preventDuplicates: true});
        }
      })
    }else {
      alert('Something Went Wrong');
    }
  }


  editInsDetails(InsData) {
    this.dialogService.open(EditInsDetailsComponent, {
      context: {
        editInsDetails: InsData,
      },
    }).onClose.subscribe(data => {
      setTimeout(() => {
        this.getAdminDetails();
      }, 2000)
    });



  };

  editEduDetails = (eduData) => {
    this.dialogService.open(EditEduDetailsComponent, {
      context: {
        editEduDetails: eduData,
      },
    }).onClose.subscribe(data => {
      setTimeout(() => {
        this.getAdminDetails();
      }, 2000)
    });



  }

}
