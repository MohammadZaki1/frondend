import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListStudentsComponent } from './list-students.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ViewApplicationsComponent } from '../view-applications/view-applications.component';
import { ErrataUpdateComponent } from '../view-applications/errataUpdate/errataUpdate.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ListStudentsComponent,ViewApplicationsComponent,ErrataUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    MatFormFieldModule,
    MatIconModule,
    NbButtonModule,
    NbCardModule,
    ConfirmDialogModule,
    NgxPaginationModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    DialogModule,
    FileUploadModule
  ]
})
export class ListStudentsModule { }
