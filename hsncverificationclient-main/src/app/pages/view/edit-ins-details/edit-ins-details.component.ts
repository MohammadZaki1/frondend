import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { NbDialogRef,  NbToastrService } from '@nebular/theme'; 
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith, takeUntil } from 'rxjs/operators';
import * as _moment from 'moment';
import { Moment} from 'moment';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { ApplicationApi } from '../../../@core/backend/common/api/application.api';
import { RegisterUserApi } from '../../../@core/backend/common/api/registerUser.api';
import { UserStore } from '../../../@core/stores/user.store';
import { User, UserData } from '../../../@core/interfaces/common/users';
import { Subject } from 'rxjs';


@Component({
  selector: 'ngx-edit-ins-details',
  templateUrl: './edit-ins-details.component.html',
  styleUrls: ['./edit-ins-details.component.scss']
})
export class EditInsDetailsComponent {
  @Input() editInsDetails;
  errataForm: FormGroup;
  user_id: any;
  role: any;
  user: User; 
  protected readonly unsubscribe$ = new Subject<void>();
  readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;




  constructor(protected ref: NbDialogRef<EditInsDetailsComponent>,
    private fb : FormBuilder,
    private api: ApplicationApi,
    private toastrService: NbToastrService,
    private userStore: UserStore,
    private usersService: UserData,) { }

  ngOnInit(): void {
    if(this.userStore.getUser() == undefined){
      this.usersService.getCurrentUser().pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => { 
        this.user = user;
        this.role= user.role;
        this.user_id = this.user.id;
      })
    }
    this.errataForm = this.fb.group({
      id : new FormControl(['']),
      app_id: this.editInsDetails.app_id,
      user_id: this.editInsDetails.user_id,
      referenceNo: ['', Validators.required],
      name:  ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailValidate)]],
      deliveryOption:new FormControl([''])
      
  }
  )
  this.errataForm.patchValue({
    id: this.editInsDetails.id,
    referenceNo: this.editInsDetails.referenceNo,
    name: this.editInsDetails.name,
    address: this.editInsDetails.address[0].address,
    email: this.editInsDetails.email,
    deliveryOption:this.editInsDetails.deliveryOption
  });
  
  
  }
  dismiss(){
    this.ref.close();
}

saveDetails(email){
  if (this.errataForm.controls.referenceNo.value==''||this.errataForm.controls.name.value==''||this.errataForm.controls.email.errors?.pattern||
  ((this.errataForm.controls.email.value == '' && this.errataForm.controls.address.value == '') || 
  (this.errataForm.controls.email.value == null && this.errataForm.controls.address.value == ''))) {
    this.toastrService.danger("Please fill all data");
  }else{
    this.api.saveInsDetails(this.errataForm.value,email).subscribe(data=>{
      this.toastrService.success("Saved Successfully");
      this.ref.close();
  })
  }
       
  

}
}
