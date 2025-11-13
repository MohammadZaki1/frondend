import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSignedComponent } from './admin-signed.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {NbCardModule ,NbPopoverModule, NbActionsModule, NbButtonModule, NbAlertModule, NbProgressBarModule, NbInputModule,  NbTabsetModule,NbDatepickerModule} from '@nebular/theme'; 
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SharedModule } from "../../shared-authpipe.module";


@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [AdminSignedComponent],
    imports: [
        CommonModule,
        NgxPaginationModule,
        ConfirmDialogModule,
        NbTabsetModule,
        // MatFormFieldModule,
        // SharedModule,
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
        NbInputModule,
        NbDatepickerModule,
        SharedModule
    ]
})
export class AdminSignedModule { }
