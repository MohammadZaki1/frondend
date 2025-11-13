import { Component, Input} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router} from '@angular/router';
import {  NbToastrService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationApi } from '../../@core/backend/common/api/application.api';



@Component({
    selector: 'nb-dialog',
    template: `
    <nb-card [style.width.px]="450"  [style.height.px]="300" status="success">
    <nb-card-header style="background-color: #007ad9;">
      <div class="row">
      <div class="col-md-10">
      Notes:
    </div>
      <div class="col-md-2" >
      <img src="https://img.icons8.com/ios/45/FF0000/xbox-x.png" style="height: 30px; width: 30px;" (click)="close()">

      </div>
      

      </div>
    </nb-card-header>
    <nb-card-body>
      <p>{{notes}}</p>
    </nb-card-body>
    <nb-card-footer>
      <div class="row" >
        <div class="col-md-5"></div>
      </div>
    </nb-card-footer>
  </nb-card>
    `,
    })
export class studentnotes {
  @Input() docid:any;
  @Input() type:any;
  @Input()notes : any;
  studentnote: any;
  form_submitted:boolean=false;
userStore: any;
usersService: any;
id: any;
user: any;
role: any;
email: any;
    constructor(protected ref: NbDialogRef<studentnotes>,
      private router : Router,
      private authService: NbAuthService,
      protected api : ApplicationApi,
      private toastrService: NbToastrService,
      private fb: FormBuilder,
      ) {
          
    }
    ngOnInit() {

      this.studentnotes();
      }
      private studentnotes() : void{
        this.studentnote = this.fb.group({
          noteCtrl :['',[Validators.required]],
        });
      }

    close(){
        this.ref.close();
    }

    // addNotes(){
    //     this.addNote = true;
    //     this.notes = this.notes_area;
    //   }
      
    saveNotes(){
        // this.api.saveNotes(this.app_id,this.notes).subscribe(data=>{
        //   this.notes_area = data['data'];
        //   this.toastrService.show('Succesfully Saved.','Success');
        //   this.ref.close();

        // })
      }
    

    
    
}