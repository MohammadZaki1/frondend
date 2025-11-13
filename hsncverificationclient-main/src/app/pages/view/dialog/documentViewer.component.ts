import { Component, Input} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router} from '@angular/router';
import { ApplicationApi } from '../../../@core/backend/common/api/application.api';
import { ApplicationProcessApi } from '../../../@core/backend/common/api/applicationProcess.api';
import {  NbToastrService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
    selector: 'nb-dialog-pdf',
    templateUrl: './documentViewer.component.html',
    styleUrls: ['./documentViewer.component.scss'],
    })
export class DocumentViewer {
    @Input() arr: any;
    @Input() srcInp: any;
    @Input() user_id: any;
    fileDetails: any;
    constructor(protected ref: NbDialogRef<DocumentViewer>,
      private router : Router,
      private authService: NbAuthService,
      private processApi : ApplicationProcessApi,
    private api: ApplicationApi, 

      private toastrService: NbToastrService,
      ) {}

    ngOnInit(){
        this.api.getFileDetailsDocument(this.arr,this.user_id).subscribe(data=>{
            if(data['status'] == 200){
                this.fileDetails = data['data'];
            }
        })
    }
    
    close(){
        this.ref.close();
    }   
}