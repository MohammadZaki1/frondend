import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NbCardModule, NbButtonModule, NbStepperModule, NbListModule } from '@nebular/theme';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    FileUploadModule,
    DialogModule,
    NbStepperModule,
    NbListModule
  ]
})
export class DashboardModule { }
