import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../@core/interfaces/common/users';
import { UserStore } from '../../@core/stores/user.store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ApplicationProcessApi } from '../../@core/backend/common/api/applicationProcess.api';
import { saveAs } from 'file-saver';
import { environment } from '../../../environments/environment';
import { NbStepperComponent } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;
  alive: boolean = true;
  protected readonly unsubscribe$ = new Subject<void>();
  displayvideo1: boolean;
  displayvideo2: boolean;
  displayvideo3: boolean;
  notes: any;
  appFlag: boolean;
  serverUrl = environment.apiUrl;
  applicationData: any;
  alertFlag: number;
  @ViewChild('progressStepper') stepper: NbStepperComponent;
  message: string;
  lock_transcript: any;

  
  constructor(protected router: Router,
    private usersService: UserData,
    protected api : ApplicationProcessApi) { 
      this.usersService.getCurrentUser().pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => { 
        this.user = user;
        if(this.user.is_email_verified == true && this.user.is_otp_verified == true){
          if(this.user.role == 'admin'  || this.user.role == 'subAdmin') {
            //this.router.navigate(['pages/adminPending']);
            this.router.navigate(['pages/admindashboard']);
          }else if(this.user.role == 'agent'){
            this.router.navigate(['pages/agent-dashboard'])
          }
        }else{
          this.router.navigate(['auth/logout']);
        }
      })
  }

  ngOnInit(): void {
    this.getApplicationsDetails();
  }

  getApplicationsDetails(){
    this.api.getApplicationsDetails().subscribe(data=>{
      if(data['data'] != null){
        this.appFlag = true;
        this.applicationData = data["data"];
        this.lock_transcript = data['lock_transcript'];


      }else{
        this.appFlag = false;
      }
    })
  }

  dashboardRoutes(){
    this.router.navigate(['pages/student-dashboard/application']);
  }

  downloadLetter(){
		var file_name = 'NOC letter.pdf'
		this.api.downloadTemplate().subscribe(data => {
			saveAs(data,file_name); 
		})
	}

  videoPopup(no){
    var video_no = no;
    if(video_no == 1){
      this.displayvideo1 = true;
    }
    if(video_no == 2){
      this.displayvideo2 = true;
    }
    if(video_no == 3){
      this.displayvideo3 = true;
    }
  }

  onClose() {
    this.alertFlag = 0;
  
  }

  selectStep(institute) {
    if(this.stepper.selectedIndex == 0){
      if(institute.tracker == 'apply' || institute.tracker == 'verified' || institute.tracker == 'signed' || institute.tracker == 'done' || institute.tracker == 'print'){
        this.message = "You have successfully applied for verification";
        this.alertFlag = 1;
        this.timer();
      }else {
        this.message = "You have not applied";
        this.alertFlag = 1;
        this.timer();
      }
    }else if(this.stepper.selectedIndex == 1){
      if(institute.tracker == 'verified' || institute.tracker == 'signed' || institute.tracker == 'done' || institute.tracker == 'print'){
        this.message = "Your application successfully verified";
        this.alertFlag = 1;
        this.timer();
      }else{
        this.message = "Your application is in verification process. Please wait";
        this.alertFlag = 1;
        this.timer();
      }
    }else if(this.stepper.selectedIndex == 2){
      if(institute.tracker == 'signed' || institute.tracker == 'done' || institute.tracker == 'print'){
        this.message = "Congratulations! Your all documents has been signed/printed.";
        this.alertFlag = 1;
        this.timer();
      }else if(institute.tracker == 'verified'){
        this.message = "Your application is Verified and working in further process. Please wait";
        this.alertFlag = 1;
        this.timer();
      }else{
        this.message = "Your application in verification process. Please wait";
        this.alertFlag = 1;
        this.timer();
      }
    }else if(this.stepper.selectedIndex == 3){
      if(institute.tracker == 'done'){
        this.message = "Your documents successfully Verified and sent/couriered to the mentioned agency";
        this.alertFlag = 1;
        this.timer();
      }else if(institute.tracker == 'signed' || institute.tracker == 'print'){
        this.message = "Your application is signed/printed and working in further process. Please wait";
        this.alertFlag = 1;
        this.timer();
      }else if(institute.tracker == 'verified'){
        this.message = "Your application in verified and working in further process. Please wait";
        this.alertFlag = 1;
        this.timer();
      }else{
        this.message = "Your application is in verification process. Please wait";
        this.alertFlag = 1;
        this.timer();
      }
    }else if(this.stepper.selectedIndex == 4){
       if(institute.status == 'done'){
        this.message = "Your application sent/couriered to mentioned agency. Please wait";
        this.alertFlag = 1;
        this.timer();
      }else if(institute.status == 'signed'){
        this.message = "Your application is signed and working in further process. Please wait";
        this.alertFlag = 1;
        this.timer();
      }else if(institute.status == 'verified'){
        this.message = "Your application in verified and working in further process. Please wait";
        this.alertFlag = 1;
        this.timer();
      }else{
        this.message = "Your application is in verification process. Please wait";
        this.alertFlag = 1;
        this.timer();
      }
    }
  }
  
  timer() {
    setTimeout(() => {
      this.alertFlag = 0;
    }, 5000);
  }

  errataLink(){
    this.router.navigate(['pages/Myapplication']);
  } 
}
