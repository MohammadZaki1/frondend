import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewComponent implements OnInit {
  @Input() src: string;
  viewFlag:boolean=false;
  pdfFilePath = "";
  constructor(protected ref : NbDialogRef<PdfViewComponent>,) { }

  ngOnInit(): void {}

  download() {
    window.open(this.src)
  }

  view(){
    this.viewFlag=true;
    this.pdfFilePath = this.src;
  }
 
  cancel() {
   this.ref.close();
  }
}
