import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTotalComponent } from './admin-total.component';
import {NgxPaginationModule} from 'ngx-pagination';
// import { SharedModule } from '../../pages/shared-authpipe.module';
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {NbCardModule ,NbPopoverModule, NbActionsModule, NbButtonModule, NbAlertModule, NbProgressBarModule, NbInputModule} from '@nebular/theme'; 
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared-authpipe.module';


@NgModule({
schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AdminTotalComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    // MatFormFieldModule,
    SharedModule,
    TabViewModule,
    TableModule,
    NbCardModule,
    NbPopoverModule,
    NbActionsModule,
    NbButtonModule,
    NbAlertModule,
    // MatInputModule,
    // MatSelectModule,
    // MatIconModule,
    // MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule, 
    NbProgressBarModule,
    // MatFormFieldModule, 
    // MatProgressBarModule, 
    // MatProgressSpinnerModule,
    NbInputModule
  ]
})
export class AdminTotalModule { }
