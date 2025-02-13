import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { SharedModule } from '../../shared-authpipe.module';
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {NbCardModule ,NbPopoverModule, NbActionsModule, NbButtonModule, NbAlertModule, NbProgressBarModule, NbInputModule, NbTabsetModule,NbDatepickerModule} from '@nebular/theme'; 
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminPendingComponent } from './admin-pending.component'
 import { ConfirmationService } from 'primeng/api';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

@NgModule({
declarations: [AdminPendingComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    TabViewModule,
    TableModule,
    NbCardModule,
    NbPopoverModule,
    NbActionsModule,
    NbButtonModule,
    NbAlertModule,
    ConfirmDialogModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    SharedModule,
    NbTabsetModule,
    ReactiveFormsModule, 
    NbProgressBarModule,
    MatFormFieldModule, 
    NbInputModule,
    NbDatepickerModule,DialogModule
  ],
  providers: [ConfirmationService]
})
export class AdminPendingModule { }
