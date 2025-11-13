import { Component , Input} from '@angular/core';
import { NbDialogRef} from '@nebular/theme';

import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ApplicationApi } from '../../@core/backend/common/api/application.api';

@Component({
   selector: 'nb-dialog',
  template: `<nb-card [style.width.px]="450"  [style.height.px]="300" status="success">
  <nb-card-header>
    <div class="row">
      <div class="col-md-8">
        Notes:
      </div>
      <div class="col-md-4" style="text-align:right">
        <nb-action icon="ion-close" (click)="close()"></nb-action>
      </div>
    </div>
  </nb-card-header>
  <nb-card-body>
    <form [formGroup]="statementForm"  class="step-container">
    <textarea cols="30" rows="5"  [ngClass]="{'form-control-danger': statementForm.controls.statementCtrl.invalid && (statementForm.controls.statementCtrl.dirty || statementForm.controls.statementCtrl.touched)}" formControlName="statementCtrl" placeholder="Please enter the message" class="form-control">
    </textarea>
    <div *ngIf="form_submitted && statementForm.controls.statementCtrl.invalid">
      <div *ngIf="statementForm.controls.statementCtrl.required">Message is required</div>
    </div>
    </form>
  </nb-card-body>
  <nb-card-footer>
    <div class="row" >
      <div class="col-md-5"></div>
      <div class="col-md-7"><button nbButton hero status="primary" (click)="ok()">OK</button></div>
    </div>           
  </nb-card-footer>
</nb-card>
`,
})

export class OpenNoteBoxComponent  {
  @Input() event:any;
  @Input() type:any;
  @Input() app_id:any;
  @Input() user_id:any;
  @Input() document_id:any;

  statementForm: any;
  form_submitted:boolean=false;


  constructor(protected ref: NbDialogRef<OpenNoteBoxComponent>,
    protected api : ApplicationApi,
    private fb: FormBuilder,
    private toastrService: NbToastrService,) {
  }

  ngOnInit() { 
    this.buildstatementForm();
  }

  private buildstatementForm() : void{
    this.statementForm = this.fb.group({
      statementCtrl :['',[Validators.required]],
    });
  }

  close(){
    this.ref.close();
  }

  ok(){    
    this.statementForm.controls.statementCtrl.markAsDirty();         
    this.form_submitted = true;
    if (this.statementForm.valid) {
      this.api.setApplicationErrata(this.event,this.document_id,this.user_id,this.type,this.app_id,this.statementForm.controls.statementCtrl.value).subscribe(data =>{
        this.ref.close(data);
      })
    }   
  }
 
  
 
}