import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared-authpipe.module';
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import { NbCardModule ,NbPopoverModule, NbActionsModule, NbButtonModule, NbAlertModule,  NbDatepickerModule, NbInputModule, NbSpinnerModule } from '@nebular/theme'; 
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressBarModule} from "@angular/material/progress-bar"
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner"
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";


import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    SharedModule,
    TabViewModule,
    TableModule,
    NbCardModule,
    NbPopoverModule,
    NbActionsModule,
    NbButtonModule,
    NbAlertModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule, 
    MatProgressBarModule, 
    MatProgressSpinnerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    NbInputModule,
    NbSpinnerModule

  ]
})
export class ReportModule { }
