
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { saveAs } from 'file-saver';
import { ApplicationProcessApi } from '../../@core/backend/common/api/applicationProcess.api';
import { FeedbackComponent } from './feedback.component';
import { NbDialogService } from '@nebular/theme';
import { UserData } from '../../@core/interfaces/common/users';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'firstsuccess',
  template: `
  <div class="row">
    <div class="col-xxxl-8 col-xxl-8 col-lg-7 col-md-8">
      <nb-card>
        <nb-card-header>
          <h1>PAYMENT SUCCESSFUL</h1>
        </nb-card-header>
        <nb-card-body>
          <div class="row">
            <h2>
              Thank you! Your transaction is successful
            </h2>
          </div>
          <div class="row">
            <h2>
              Your transaction id is {{ transaction_id }}
            </h2>  
          </div>
          <div class="row">
            <h3>
              <a href="" ng-click="redirect()">Click here</a>
              To proceed further
            </h3>
          </div>
          <div class="row">
            <h3> 
              Payment Details :-
            </h3>
          </div>
          <div class="row">
            <h4>
              Application Id: {{ application_id }}
            </h4>
          </div>
          <div class="row">
            <h4>
              Transaction ID: {{ transaction_id }}
            </h4> 
          </div>
          <div class="row">
            <h4>
              Amount        : {{ payment_amount }}
            </h4>
          </div>
          <div class="row">
            <h4>
              Payment Status: {{ payment_status }}
              <button nbButton status="primary" (click)="download()">Download Payment Receipt</button>
            </h4>
          </div>
        </nb-card-body>
      </nb-card>
    </div>
  </div>`,
})
export class FirstSuccessComponent  {

  protected readonly unsubscribe$ = new Subject<void>();
  user:any;
  
  constructor(private router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private usersService: UserData,
    protected api : ApplicationProcessApi) {
      // this.usersService.getCurrentUser().pipe(takeUntil(this.unsubscribe$))
      // .subscribe((user) => { 
        
      //   if(this.user.is_email_verified == false && this.user.is_otp_verified == false){
      //     this.router.navigate(['auth/logout']);
      //   }else{
      //     this.user = user;
      //   }
      // })
  }
  transaction_id;
  application_id;
  payment_amount;
  payment_status;
  payment_date_time;
  user_id;
  enrollment_no;
  order_id;
  feedback: any;

  async ngOnInit() {
    var PaymentDetails = await this.api.PaymentDetails(this.route.snapshot.queryParamMap.get('order_id'))
    PaymentDetails.subscribe(
      data => {
        this.transaction_id = data['data']['transaction_id'];
        this.application_id = data['data']['application_id'];
        this.payment_amount = data['data']['payment_amount'];
        this.payment_status = data['data']['payment_status'];
        this.payment_date_time = data['data']['payment_date_time'];
        this.feedback = data['data']['feedback'];
        this.user_id = data['data']['user_id'];
        this.order_id = this.route.snapshot.queryParamMap.get('order_id')
        this.enrollment_no = data['data']['enrollment_no'];
        this.download()
        this.feedbackfun(this.feedback);
        this.mergeDocuments();
        this.generateSerialNumbers();
      }
    )


  }

  feedbackfun(value){
    if(value == false){
      this.dialogService.open(FeedbackComponent, {
        closeOnBackdropClick : false,
        context: {
          user_id : this.user_id
        },
      }).onClose
      .subscribe(
        (data: any) => {
        }
      )
    }
  }




  redirect(){
    this.router.navigateByUrl('/pages/Myapplication');
  }

 
  download(){
    var generatereceipt = this.api.OnlinePaymentChallan(this.user_id,this.transaction_id,this.payment_amount,this.payment_status,this.application_id,this.payment_date_time,this.order_id);
    generatereceipt.subscribe(
      data => {
       if(data['status']==200){
        
          this.api.downloadFiles(data['data'])
          .subscribe(data => {
            
            saveAs(data, data['data']) ;
          });
        }
      },
      error => {
          console.error("Error", error);
      }
    );
  }

  mergeDocuments(){
    this.api.mergeDocuments(this.user_id,this.application_id).subscribe(data=>{
      
    })
  }

  generateSerialNumbers(){
    this.api.generateSerialNumbers(this.user_id,this.application_id).subscribe(data=>{
      
    })
  }
}

