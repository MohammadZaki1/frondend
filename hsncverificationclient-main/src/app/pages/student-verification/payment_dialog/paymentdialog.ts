import { Component, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { ApplicationApi } from "./../../../@core/backend/common/api/application.api";
import { NbAuthService, NbAuthJWTToken } from "@nebular/auth";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApplicationProcessApi } from "../../../@core/backend/common/api/applicationProcess.api";
import { ThirdPartyApplicationsApi } from "../../../@core/backend/common/api/thirdPartyApplications.api";

@Component({
  selector: "nb-dialog",
  styles: [
    "input { width: 100%;height: 48px;padding-left: 10px;margin-bottom: 8px;border: 1px solid #A4A4A4;border-radius: 0.25rem; }",
    "button {width: 100%;height: 38px;color: #FFFFFF;border-radius: 5px;background-color: #3366FF;border-color: #3366FF;border-style: solid;}"
  ],
  template: `
    <nb-card
      [style.width.px]="700"
      [style.height.px]="600"
      status="success"
      accent="success"
      size="xsmall"
    >
      <nb-card-header>
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
          <h3 style="color:#ffffff">PAYMENT DETAILS</h3>
          </div>
          <div class="col-md-3"></div>
        </div>
      </nb-card-header>
      <nb-card-body>
        <div style="text-align: left; ">
          <h5 >Instructions</h5>
          <ul>
            <li style="color: red;"><b>	Fees paid are non refundable.</b></li>
            <li style="color: red;"><b>	Verify all the data before proceeding for payment</b></li>
            <li style="color: red;"><b> Once the payment is done, you won’t be able to edit/remove any of the details/ documents</b></li>
          </ul>
        </div>
      <nb-card>
        <nb-card-body>
          <div class="row" style="margin-bottom:7px">
            <div class="col-md-3">Name</div>
            <div class="col-md-9">
              <input
                type="text"
                nbInput
                fullWidth
                placeholder="Name"
                ngModel="{{ user_data?.name }}"
                [readonly]="true"
              />
            </div>
          </div>
          <div class="row" style="margin-bottom:7px">
            <div class="col-md-3">Email</div>
            <div class="col-md-9">
              <input
                type="text"
                nbInput
                fullWidth
                placeholder="Email"
                ngModel="{{ user_data?.email }}"
                [readonly]="true"
              />
            </div>
          </div>
          <div class="row" style="margin-bottom:7px">
            <div class="col-md-3">Amount</div>
            <div class="col-md-9">
              <input
                type="text"
                nbInput
                fullWidth
                placeholder="Amount"
                ngModel="{{ amount }}"
                [readonly]="true"
              />
            </div>
        </div>
        </nb-card-body>
        </nb-card>
      </nb-card-body>
      <nb-card-footer>
        <div class="row">
          
          <div class="col-md-4"></div>
            <button class="col-md-2" (click)="dismiss()">
              Close</button>
              <div class="col-md-1"></div>
              <button class="col-md-2" (click)="firstpayment()">
              Proceed</button>
              <div class="col-md-3"></div>
          
        </div>
      </nb-card-footer>
    </nb-card>
    <div>
      <form
        id="nonseamless"
        method="post"
        name="redirect"
        action="{{ secureUrl }}"
      >
        <input
          type="hidden"
          id="encRequest"
          name="encRequest"
          value="{{ encRequest }}"
        /><input
          type="hidden"
          name="access_code"
          id="access_code"
          value="{{ accessCode }}"
        />
      </form>
    </div>
  `,
})
export class Firstpaymentdialog {
  @Input() source;
  @Input() user_id;
  user_data;
  applicationId;
  courseID;
  accessCode;
  secureUrl;
  encRequest;
  loading = false;
  amount;

  constructor(
    protected ref: NbDialogRef<Firstpaymentdialog>,
    protected api: ApplicationApi,
    private authService: NbAuthService,
    private processApi: ApplicationProcessApi,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private agentApi: ThirdPartyApplicationsApi
  ) {}

  dismiss() {
    this.ref.close();
  }

  ngOnInit() {
    if (this.user_id == null) {
      this.processApi.getPaymentAmount().subscribe((data) => {
        this.amount = data["data"];
        this.user_data = data["user_data"];
      });
    } else {
      this.agentApi.getPaymentAmount(this.user_id).subscribe((data) => {
        this.amount = data["data"];
        this.user_data = data["user_data"];
      });
    }
  }

  async firstpayment() {
    var firstpayment = await this.processApi.paymentrequest(
      this.user_data.id,
      this.user_data.name,
      this.user_data.email,
      this.amount
    );
    firstpayment.subscribe(
      (data) => {
        this.accessCode = data["data"]["accessCode"];
        this.secureUrl = data["data"]["secureUrl"];
        this.encRequest = data["data"]["encRequest"];
        setTimeout(function () {
          this.loading = false;
          var myForm = <HTMLFormElement>document.getElementById("nonseamless");
          myForm.submit();
        }, 1000);
      });
  }
}
