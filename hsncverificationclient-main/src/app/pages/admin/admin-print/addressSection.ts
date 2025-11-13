import { Component, Input } from '@angular/core';
import { NbDialogRef, NbDialogService, NbThemeService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ConfirmationService} from 'primeng/api';

@Component({
selector: 'nb-dialog',
template: `
<nb-card class="widthCSS"> 
    <nb-card-header>
        <div class="row">
            <div class="col-9">Select Section</div>
            <div class="col-3">
                <button nbButton type="button" (click)="close1()" class="close closeBtn">Close</button>
            </div>    
        </div>
    </nb-card-header>
    <nb-card-body>
        <div class="row">
            <div class="col-md-3"  style="padding-bottom: 10px;">Top
                <input type="checkbox" (change)="onCheckboxChagen($event, 'A1')" >
            </div>
             <div class="col-md-3"  style="padding-bottom: 10px;">Bottom
                <input type="checkbox" (change)="onCheckboxChagen($event, 'B1')" >
            </div>
        </div>
        <div class="row">
            <div class="col-md-12" style="text-align:center;">
                <button type="button" nbButton hero status="primary" (click)="add()">save</button>
            </div>
            <div class="col-md-12" style="text-align:center;">
                <span *ngIf="RoleError == true"  style="color:red;">Please select the section</span>
            </div>
        </div>
        
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
export class addressSectionComponent {
@Input() user_id;
RoleError = false;
section = [];

constructor(protected ref: NbDialogRef<addressSectionComponent>,
  public themeService : NbThemeService) {
    
  }

  dismiss() {
    this.ref.close();
  }
  
    ngOnInit() {
       
    
    }

    close1(){
        this.ref.close();
    }

    add(){
        if(this.section.length > 0){
            this.ref.close(this.section);
        }else{
            this.RoleError = true;
        }
    }

    onCheckboxChagen(event, value) {
        if (event.target.checked) {
          this.section.push(value);
        } 
    
        if (!event.target.checked) {
    
          let index = this.section.indexOf(value);
          if (index > -1) {
            this.section.splice(index, 1);
          }
        }
    }
}
