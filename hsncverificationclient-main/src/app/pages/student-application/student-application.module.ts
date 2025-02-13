import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentApplicationComponent } from './student-application.component';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule,NbRadioModule,NbSpinnerModule, NbStepperModule, NbTabsetModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileUploadModule } from "primeng/fileupload";
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DocumentViewer } from './dialog/documentViewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [StudentApplicationComponent,DocumentViewer],
  imports: [
    CommonModule,
    NbStepperModule,
    NbSpinnerModule,
    NbCardModule,
    NbCheckboxModule,
    FormsModule,
    NbDatepickerModule,
    NbTabsetModule,
    MatDatepickerModule,
    NbButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FileUploadModule,
    MatSelectModule,
    NbSpinnerModule,
    MatAutocompleteModule,
    NbActionsModule,
    NbRadioModule,
    DialogModule,
    PdfViewerModule,
    ConfirmDialogModule
  ],
  entryComponents:[DocumentViewer]
})
export class StudentApplicationModule { }
