
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Component({
  selector: 'firstfailure',
  //styleUrls: ['./application.component.scss'],
  template: `
  <div class="row">
    <div class="col-xxxl-8 col-xxl-8 col-lg-7 col-md-8">
      <nb-card>
        <nb-card-header>
          <h1>PAYMENT FAILED</h1>
        </nb-card-header>
        <nb-card-body>
          <h4>Please Try again</h4><br>
          <br>
          <h4><b>Order Status :- {{ order_status }}</b></h4>
          <br>
          <h4> {{ message }} </h4>
          <br>
          <a href="" ng-click="redirect()">Click here</a>
           To Go Back
        </nb-card-body>
      </nb-card>
    </div>
  </div>`,
})
export class FirstFailureComponent  {
  order_status: string;
  message: string;
  user_id;
  constructor(private router: Router,private route: ActivatedRoute,
    private authService: NbAuthService,) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
        this.user_id = token.getPayload()['id'];
    });
  }
  async ngOnInit() {
    this.order_status = this.route.snapshot.queryParamMap.get('order_status');
    if(this.order_status == 'Failure'){
      this.message = 'The transaction has been declined by your bank, for security concerns bank does not enclose the reason to us. Please contact your bank to know the reason for failure.';
    }else if(this.order_status == 'Timeout'){
      this.message = 'The CCAvenue payment page has a Timeout set at 15 minutes per session. If you are on the payment page and click on "Pay Now" after 15 minutes, the CCAvenue payment page times out.Amount is not charged to you,please proceed for payment again.';
    }else if(this.order_status == 'Aborted'){
      this.message = 'The transaction are dropped by you at the bank page. This amount is not charged to you.Please proceed for payment again.';
    }else if(this.order_status == 'Invalid'){
      this.message = 'Transaction was sent to CCAvenue with invalid parameters(payment details), hence could not be processed further.This amount is not charged to you.Please proceed for payment again.';
    }else if(this.order_status == 'error'){
      this.message = 'Please proceed for payment again.';
    }
  }

  redirect(){
    this.router.navigateByUrl('/pages/dashboard');
  }

}

