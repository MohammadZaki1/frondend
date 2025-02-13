import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentManagementComponent } from './student-management.component';
import {NgxPaginationModule} from 'ngx-pagination';import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {NbCardModule ,NbPopoverModule, NbActionsModule, NbButtonModule, NbAlertModule, NbProgressBarModule, NbInputModule} from '@nebular/theme';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import {  MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';

import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from '../../shared-authpipe.module';


@NgModule({
  declarations: [StudentManagementComponent],
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
    MatIconModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    NbProgressBarModule,
    // MatFormFieldModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    NbInputModule
  ]
})
export class StudentManagementModule { }
