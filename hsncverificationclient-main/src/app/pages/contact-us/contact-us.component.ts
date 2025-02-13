import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
}) 
export class ContactUsComponent implements OnInit {

  constructor(protected ref: NbDialogRef<ContactUsComponent>, ) { }

  ngOnInit(): void {
  
  }
  close() { 
    this.ref.close();
  }


}