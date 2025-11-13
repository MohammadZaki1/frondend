

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-create-deduction',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {


  @Input() id: string;
  @Input() first_name:string;
  @Input() last_name:string;
  @Input() email:string;
  
  constructor(private fb: FormBuilder,
    protected ref : NbDialogRef<ConfirmationDialogComponent>,
     private toastrService: NbToastrService,
     ) {
   
  }

  ngOnInit(): void {
 
  }


  submit() {



  
     // this.toastrService.danger('Error : Incomplete Fields','Status',)
    //TODO : update value in database
    //this.id[0]['update']=true;
     this.ref.close(this.id);



  }
 
  


  cancel() {
    
    this.ref.close();
  }

}
