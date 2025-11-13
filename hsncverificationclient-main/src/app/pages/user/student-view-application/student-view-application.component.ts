import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../@core/backend/common/services/shared.service';
import { User } from '../../../@core/interfaces/common/users';
import { UserStore } from '../../../@core/stores/user.store';
import { Firstpaymentdialog } from '../../student-verification/payment_dialog/paymentdialog';
import { NbDialogService } from '@nebular/theme'; 
import { ApplicationApi } from '../../../@core/backend/common/api/application.api';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'ngx-student-view-application',
  templateUrl: './student-view-application.component.html',
  styleUrls: ['./student-view-application.component.scss']
})
export class StudentViewApplicationComponent implements OnInit {

  userApplication: any;
  singleApplication:any;
  role: string;
  user: User; 
  email: string;
  id: any;
  p2: number = 1;
  page: number = 1;
  subscriptionGroup: Subscription[]= [];
  constructor( 
     private userStore: UserStore, 
     private router: Router,
     private applicationapi: ApplicationApi,
     private sharedService: SharedService,
     private NbDialogService: NbDialogService,) { }

  ngOnInit(): void {
    if(this.userStore.getUser() == undefined){
      this.router.navigate(['auth/login']);
    }else{
        this.user=this.userStore.getUser();
        this.id=this.user.id;
        this.role=this.user.role;
        this.email=this.user.email;
       this.applicationapi.getApplication(this.user.id).subscribe(data => {
        this.userApplication = data['data'];   
      })
      this.subscriptionGroup.push(
        this.sharedService.usermessageSource.subscribe((message) => {
         if(message == 'applied' || message == 'errata'){
           this.ngOnInit();
         }
     })
        )
       }
    
  }
  viewDocument(url){
       //  var url =environment.apiUrl+`/applications/id/
      //var url = this.userApplication[0]['choose_file']  
   window.open(url, '_blank')
    //  this.applicationapi.viewDocument(url).subscribe(resp=>{
    //   window.open(resp['data'], '_blank')
    //  })
     
  }

  downloadReceipt(){
  }
  // proceedforpayment(app_id,app_email,app_name){
  //   this.NbDialogService.open(Firstpaymentdialog, {
  //     context: {
  //       app_id : app_id,
  //       app_email: app_email,
  //       app_name: app_name,
  //     }
  //   })
    
  // }

  ngOnDestroy() {
    this.subscriptionGroup.forEach(subscription => {
      subscription.unsubscribe()
  })
    //this.sharedService.messageSource.unsubscribe();
  }
  editApplication(applicationId){
    //TODO fetch the application and display on the student-apply component
    this.applicationapi.getApplicationIdWise(applicationId).subscribe(data => {
      this.singleApplication = data['data'];   
      this.sharedService.userErrata.next(this.singleApplication);
    })
   
  }
}
