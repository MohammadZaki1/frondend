import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ApplicationProcessApi } from '../../@core/backend/common/api/applicationProcess.api';


@Component({
  selector: 'feedback',
  template: `
  <form [formGroup]="FeedbackForm" >
  <nb-card status="success" [style.width.px]="700">
    <nb-card-header>We would like your feedback to improve our website</nb-card-header>
    <nb-card-body>
        <div class="row">
            <div class="col-lg-12">
                How satisfied are you with the website ?
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col-lg-3">
                <input type="radio"  name="satisfy" id="Unsatisfy" value="Unsatisfy"
                    formControlName="satisfy" /> Unsatisfy
            </div>
            <div class="col-lg-3">
                <input type="radio" name="satisfy" id="can_improve"
                value="can_improve" formControlName="satisfy" /> Can
                Improve
            </div>
            <div class="col-lg-3">
                <input type="radio" name="satisfy" id="good" value="good"
                formControlName="satisfy" /> Good
            </div>
            <div class="col-lg-3">
                <input type="radio"  name="satisfy" id="best" value="best"
                formControlName="satisfy" /> Best
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col-lg-12">
                Will you recommend this website to others?
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col-lg-3">
                <input type="radio" name="recommend" id="recommend_Yes"
                value="Yes" formControlName="recommend" /> Yes
            </div>
            <div class="col-lg-3">
                <input type="radio" name="recommend" id="recommend_No" value="No"
                formControlName="recommend" /> No
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col-lg-12">
                Are you satisfied with technical team?
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col-lg-3">
                <input type="radio" name="staff" id="staff_Unsatisfy"
                value="Unsatisfy" formControlName="staff" /> Unsatisfy
            </div>
            <div class="col-lg-3">
                <input type="radio" name="staff" id="staff_can_improve"
                value="can_improve" formControlName="staff" /> Can
                Improve
            </div>
            <div class="col-lg-3">
                <input type="radio" name="staff" id="staff_good" value="good"
                formControlName="staff" /> Good
            </div>
            <div class="col-lg-3">
                <input type="radio" name="staff" id="staff_best" value="best"
                formControlName="staff" /> Best
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col-lg-12">
                Did you experience any problems with our services?
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col-lg-3">
                <input type="radio" name="experience" id="yes" value="yes"
                formControlName="experience" (change)="stateProblem('yes');" /> Yes
            </div>
            <div class="col-lg-3">
                <input type="radio" name="experience" id="no" value="no"
                formControlName="experience" (change)="stateProblem('no');"/> No
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <textarea nbInput fullWidth shape="round" formControlName="exp_prob"
                *ngIf="showExperience"></textarea>
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col-lg-6">
                Any Suggestions?(optional)
            </div>
            <div class="col-lg-6">
                <textarea nbInput fullWidth shape="round" formControlName="suggestion"></textarea>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <nb-alert status="danger" *ngIf="validations_flag == true">
                {{feedback_message}}
                </nb-alert>
            </div>
        </div>
    </nb-card-body>
    <nb-card-footer>
        <button nbButton status="info" (click)="saveFeedback()">save</button>
    </nb-card-footer>
</nb-card>
</form>
  `
})
export class FeedbackComponent implements OnInit {
  FeedbackForm : FormGroup;
  user_id: any;
  validations_flag = false;
  feedback_message ;
  showExperience = false;

  constructor(protected api : ApplicationProcessApi,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    protected ref: NbDialogRef<FeedbackComponent>) { }

  async ngOnInit() {

    this.FeedbackForm = this.formBuilder.group({
      satisfy: [''],
      recommend : ['',],
      staff: [''],
      experience : [''],
      exp_prob : [''],
      suggestion : ['']
    });
  }

  saveFeedback(){
    var validation = true;
    if(this.FeedbackForm.controls.satisfy.value == null || this.FeedbackForm.controls.satisfy.value == '' || this.FeedbackForm.controls.satisfy.value == undefined){
      this.FeedbackForm.controls.satisfy.markAsDirty();
      this.validations_flag = true;
      validation = false;
      this.feedback_message = "Please select option for satisfaction of website";
      this.timer();
    }
    if(this.FeedbackForm.controls.recommend.value == null || this.FeedbackForm.controls.recommend.value == '' || this.FeedbackForm.controls.recommend.value == undefined){
      this.FeedbackForm.controls.recommend.markAsDirty();
      this.validations_flag = true;
      validation = false;
      this.feedback_message = "Please select option for recommendation of website";
      this.timer();
    }
    if(this.FeedbackForm.controls.staff.value == null || this.FeedbackForm.controls.staff.value == '' || this.FeedbackForm.controls.staff.value == undefined){
      this.FeedbackForm.controls.staff.markAsDirty();
      this.validations_flag = true;
      validation = false;
      this.feedback_message = "Please select option for satisfaction of technical team service";
      this.timer();
    }
    if(this.FeedbackForm.controls.experience.value == null || this.FeedbackForm.controls.experience.value == '' || this.FeedbackForm.controls.experience.value == undefined){
      this.FeedbackForm.controls.experience.markAsDirty();
      this.validations_flag = true;
      validation = false;
      this.feedback_message = "Please select option for problem experience";
      this.timer();
    }
    if(this.FeedbackForm.controls.experience.value == 'yes'   &&  this.FeedbackForm.controls.exp_prob.value == null){
      this.FeedbackForm.controls.exp_prob.markAsDirty();
      this.validations_flag = true;
      validation = false;
      this.feedback_message = "You have selected yes option for experience problem. Please state your problem";
      this.timer();
    }
    if((this.FeedbackForm.controls.satisfy.value == null || this.FeedbackForm.controls.satisfy.value == '' || this.FeedbackForm.controls.satisfy.value == undefined) && 
    (this.FeedbackForm.controls.recommend.value == null || this.FeedbackForm.controls.recommend.value == '' || this.FeedbackForm.controls.recommend.value == undefined ) && 
    (this.FeedbackForm.controls.staff.value == null || this.FeedbackForm.controls.staff.value == '' || this.FeedbackForm.controls.staff.value == undefined) && 
    (this.FeedbackForm.controls.experience.value == null || this.FeedbackForm.controls.experience.value == '' || this.FeedbackForm.controls.experience.value == undefined)){
      this.validations_flag = true;
      validation = false;
      this.feedback_message = "Please fill feedback form ";
      this.timer();
    }
    if(validation){
      this.api.feedBack(this.FeedbackForm.controls.satisfy.value, this.FeedbackForm.controls.recommend.value, this.FeedbackForm.controls.staff.value, this.FeedbackForm.controls.experience.value, this.FeedbackForm.controls.exp_prob.value, this.FeedbackForm.controls.suggestion.value,this.user_id)
      .subscribe(
        (data: any) => {
          this.ref.close();
        },
        error => {
          console.error("Error", error);
        }
      );
    }
  }

  stateProblem(value){
    if(value == "yes"){
      this.showExperience = true;
    }else if( value == "no"){
      this.showExperience = false;
    }
  }

  timer(){
    setTimeout(()=>{
      //this.onClose();
      this.validations_flag = false;
    },1000);
  }

}
