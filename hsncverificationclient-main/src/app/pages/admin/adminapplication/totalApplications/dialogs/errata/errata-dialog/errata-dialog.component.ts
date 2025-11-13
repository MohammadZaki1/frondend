import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  templateUrl: './errata-dialog.component.html',
  styleUrls: ['./errata-dialog.component.scss']
})
export class ErrataDialogComponent implements OnInit {
  public textAreaForm: FormGroup;
  @Input() id: string;
  @Input() userId:string;
  @Input() first_name:string;
  @Input() last_name:string;
  @Input() choose_file:string;
  constructor(protected ref : NbDialogRef<ErrataDialogComponent>,
    private fb:FormBuilder) {

      this.textAreaForm = fb.group({
        textArea: ""
      });

     }

  ngOnInit(): void {
  }
 save(){
  var arr= []
   var data=this.textAreaForm.get("textArea").value;
   arr.push(this.id);
   arr.push(this.userId);
   arr.push(data);
   arr.push(this.first_name);
   arr.push(this.last_name);
   arr.push(this.choose_file)
   this.ref.close(arr);
 }
 cancel(){
   this.ref.close();
 }
}
