import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbFormFieldModule, NbInputModule, NbListModule, NbPopoverModule, NbRadioModule, NbSpinnerModule, NbStepperModule, NbTabsetModule, NbTagModule } from '@nebular/theme';
import { SharedService } from '../../../@core/backend/common/services/shared.service';
import { thirdPartyApplicationComponent } from '../third-party-apply/third-party-application.component';
import { AgentDashboardComponent } from './agent-dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { MatSelectModule } from '@angular/material/select';
import { DialogModule } from 'primeng/dialog';


@NgModule({
    imports: [
        NbCardModule,
        NbDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        NbListModule,
        CommonModule,
        NgxPaginationModule,
        NbTagModule,
        NbInputModule,
        NbFormFieldModule,
        NbPopoverModule,
        NbSpinnerModule,
        NbButtonModule,
        NbCardModule,
        NbStepperModule,
        MatDatepickerModule,
        NbTabsetModule,
        MatFormFieldModule,
        MatCheckboxModule,
        DialogModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        FileUploadModule,
        NbRadioModule,
        MatSelectModule
      ],
      providers: [SharedService],
declarations: [
  thirdPartyApplicationComponent,
    AgentDashboardComponent
  ],
})

export class AgentDashboardModule { }
