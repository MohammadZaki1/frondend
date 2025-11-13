import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApplicationApi } from '../../../@core/backend/common/api/application.api';
import { ThirdPartyApplicationsApi } from '../../../@core/backend/common/api/thirdPartyApplications.api';
import { User, UserData } from '../../../@core/interfaces/common/users';
import { UserStore } from '../../../@core/stores/user.store';
import { PagesComponent } from '../../pages.component';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

 
  protected readonly unsubscribe$ = new Subject<void>();
  email: string;
  id: any;
 
  userApplication: any;
  role: string;
  user: User; 
  constructor(private dialogService: NbDialogService,
    private api: ThirdPartyApplicationsApi,
    private applicationapi: ApplicationApi,
    private userStore: UserStore,
    private toasterService: NbToastrService,
    private usersService: UserData,
    private pageComp :PagesComponent,
    private router: Router
    ) {
     // this.role = this.userStore.getUser()['role']
  }

  ngOnInit(): void {
//logout user if refresh
    if(this.userStore.getUser() == undefined){
      this.router.navigate(['auth/login']);
    }else{
        this.user=this.userStore.getUser();
        this.id=this.user.id;
        this.role=this.user.role;
        this.email=this.user.email;
      

      
      if(this.role != undefined){
        this.applicationapi.getApplication(this.user.id).subscribe(data => {
          this.userApplication = data['data'];
        })
      }
    }
  }

  downloadDocument(){
    var url =environment.apiUrl+`/download/?id=`+this.user.id
    window.open(url)
  }

  downloadReceipt(){
  }

  // downloadfile(id){
  //   window.open(this.src+"/viewCourse/download?document_id="+id)
  // }

  
  
}
