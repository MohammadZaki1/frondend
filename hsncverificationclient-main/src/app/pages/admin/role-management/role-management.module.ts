import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAccordionModule,NbButtonModule,NbCardModule,NbDialogModule,NbDatepickerModule,NbMenuModule,NbActionsModule,NbPopoverModule,NbStepperModule,NbSpinnerModule, NbAlertModule, NbInputModule } from '@nebular/theme';
import { RoleManagementComponent } from './role-management.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddSubAdminComponent } from './addSubAdmin.component';
import { SubAdminRolesComponent } from './manageroles';
import { SharedModule } from '../../shared-authpipe.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({
  declarations: [RoleManagementComponent,AddSubAdminComponent,SubAdminRolesComponent],
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
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    NbInputModule,
    NbSpinnerModule,
    MatRadioModule
  ]
})
export class RoleManagementModule { }
