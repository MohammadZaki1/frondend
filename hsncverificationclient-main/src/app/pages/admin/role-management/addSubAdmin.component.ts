import { Component, Input } from '@angular/core';
import { NbDialogRef, NbDialogService, NbThemeService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import { ApplicationApi } from '../../../@core/backend/common/api/application.api';
import { HttpClient } from '@angular/common/http';

@Component({
selector: 'nb-dialog',
providers:[ConfirmationService],
template: `
<nb-card class="widthCSS">
    <nb-card-header>
        <div class="row">
            <div class="col-9">New Sub-Admin</div>
            <div class="col-3">
                <button nbButton type="button" (click)="close1()" class="close closeBtn">Close</button>
            </div>    
        </div>
    </nb-card-header>
	<nb-card-body>
		<form [formGroup] = "subAdminForm">
       		<div class="row">
				<div class="col-md-5">Name</div>
				<div class="col-md-1">:</div>
				<div class="col-md-6">
					<mat-form-field>
						<input  matInput ngModel="{{subAdmin?.name}}" formControlName="nameCtrl" [ngClass]="{'form-control-danger': subAdminForm.controls.nameCtrl.invalid && (subAdminForm.controls.nameCtrl.dirty || subAdminForm.controls.nameCtrl.touched)}">
					</mat-form-field>
				</div>      
			</div>
			<div class="row">
				<div class="col-md-5">Surname</div>
				<div class="col-md-1">:</div>
				<div class="col-md-6">
					<mat-form-field>
						<input  matInput ngModel="{{subAdmin?.surname}}" formControlName="surnameCtrl" [ngClass]="{'form-control-danger': subAdminForm.controls.surnameCtrl.invalid && (subAdminForm.controls.surnameCtrl.dirty || subAdminForm.controls.surnameCtrl.touched)}">
					</mat-form-field>
				</div>            
			</div>
			<div class="row">
				<div class="col-md-5">Email</div>
				<div class="col-md-1">:</div>
				<div class="col-md-6">
					<mat-form-field>
						<input  matInput ngModel="{{subAdmin?.email}}" formControlName="emailCtrl" [ngClass]="{'form-control-danger': subAdminForm.controls.emailCtrl.invalid && (subAdminForm.controls.emailCtrl.dirty || subAdminForm.controls.emailCtrl.touched)}">
					</mat-form-field>
				</div>            
			</div>
			<div class="row">
				<div class="col-md-5">Mobile</div>
				<div class="col-md-1">:</div>
				<div class="col-md-6">
					<mat-form-field>
						<input  matInput ngModel="{{subAdmin?.mobile}}" formControlName="mobileCtrl" [ngClass]="{'form-control-danger': subAdminForm.controls.mobileCtrl.invalid && (subAdminForm.controls.mobileCtrl.dirty || subAdminForm.controls.mobileCtrl.touched)}">
					</mat-form-field>
				</div>           
			</div>
			<div class="row">

				<div class="col-md-5">Gender</div>
				<div class="col-md-1">:</div>
				<div class="col-md-6">
					<mat-radio-group formControlName="genderCtrl" ngModel="{{subAdmin?.gender}}">
						<div class="row">
							<div class="col-md-6">
								<mat-radio-button value="Male" id="Male_value" >Male</mat-radio-button>
							</div>
							<div class="col-md-6">
								<mat-radio-button value="Female" id="Female_value">Female</mat-radio-button>
							</div>
						</div>
					</mat-radio-group>
				</div>           
			</div>
			<div class="row">
				<div class="col-md-4"></div>
				<div class="col-md-4"> <button nbButton status="success" (click)="save();">Save</button></div>
				<div class="col-md-4"></div>
			</div>
		</form>
    </nb-card-body>
    </nb-card>
`,
styles:[`
            .widthCSS{
                width: 400px
            }
            @media all and (min-width: 500px) {
                .widthCSS{
                    width: 600px
                }
            }
      `]
})
export class AddSubAdminComponent {
@Input() userId;
subAdmin :any;
subAdminForm : FormGroup;

constructor(protected ref: NbDialogRef<AddSubAdminComponent>,
  protected api : ApplicationApi,
  private fb: FormBuilder,
  private dialogService: NbDialogService,
  public themeService : NbThemeService,
  private confirmationService: ConfirmationService,
  private http:HttpClient) {
    
  }

  dismiss() {
    this.ref.close();
  }
  
    ngOnInit() {
       	if(this.userId != null){
		   	this.api.getSubAdminData(this.userId).subscribe(data=>{
				this.subAdmin = data['data'];
		   	});
		}
		this.subAdminForm = this.fb.group({
			nameCtrl : ['',Validators.required],
			surnameCtrl : ['',Validators.required],
			emailCtrl : ['',Validators.required],
			mobileCtrl :['',Validators.required],
			genderCtrl : ['',Validators.required],
		});   
    }


    close1(){
        this.ref.close();
    }

	save(){
		
		if(this.subAdminForm.valid){
			var subAdminData = {
				name : this.subAdminForm.controls.nameCtrl.value,
				surname : this.subAdminForm.controls.surnameCtrl.value,
				email : this.subAdminForm.controls.emailCtrl.value,
				mobile : this.subAdminForm.controls.mobileCtrl.value,
				gender : this.subAdminForm.controls.genderCtrl.value,
			}
			this.api.addUpdatesubAdmin(this.userId, subAdminData).subscribe(data=>{
				this.ref.close(data['data']);
			})
		}
	}
}
