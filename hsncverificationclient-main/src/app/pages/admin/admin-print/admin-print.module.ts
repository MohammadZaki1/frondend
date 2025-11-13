import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {NbCardModule ,NbPopoverModule, NbActionsModule, NbButtonModule, NbAlertModule, NbProgressBarModule, NbInputModule,  NbTabsetModule} from '@nebular/theme'; 
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AdminPrintComponent } from './admin-print.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { addressSectionComponent } from './addressSection';
import { SharedModule } from "../../shared-authpipe.module";

@NgModule({
    declarations: [AdminPrintComponent, addressSectionComponent],
    entryComponents: [
        addressSectionComponent
    ],
    imports: [
        CommonModule,
        ConfirmDialogModule,
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
        MatFormFieldModule,
        MatButtonModule,
        // MatProgressBarModule, 
        // MatProgressSpinnerModule,
        NbInputModule,
        NgxPaginationModule,
        SharedModule
    ]
})
export class AdminPrintModule { }
