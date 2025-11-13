import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCalendarKitModule, NbCardModule, NbDatepickerModule, NbFormFieldModule, NbInputModule, NbListModule, NbPopoverModule, NbTagModule } from '@nebular/theme';
import { SharedService } from '../../../@core/backend/common/services/shared.service';

import { NgxPaginationModule } from 'ngx-pagination';
import { StudentApplyComponent } from '../student-apply/student-apply.component';
import { StudentViewApplicationComponent } from '../student-view-application/student-view-application.component';
import { StudentDashboardComponent } from './student-dashboard.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SafePipeModule } from 'safe-pipe';



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
        NbCalendarKitModule,
        PdfViewerModule,
        SafePipeModule
      ],
      providers: [SharedService],
declarations: [
    StudentApplyComponent,
    StudentViewApplicationComponent,
    StudentDashboardComponent
  ],
})

export class StudentDashboardModule { }
