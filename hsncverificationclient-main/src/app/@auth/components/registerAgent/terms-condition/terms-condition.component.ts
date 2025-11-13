import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class NgxTermsConditionComponent implements OnInit {

  constructor(protected ref: NbDialogRef<NgxTermsConditionComponent>,) { }

  ngOnInit(): void {
  }
  
  close() { 
    this.ref.close();
  }

}
