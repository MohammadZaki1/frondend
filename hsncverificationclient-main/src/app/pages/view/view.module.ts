import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view.component';
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {NbCardModule ,NbPopoverModule, NbActionsModule, NbButtonModule, NbAlertModule, NbSpinnerModule, NbStepperModule, NbAccordionModule} from '@nebular/theme'; 
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { NbSelectModule, NbDatepickerModule } from '@nebular/theme';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService} from 'primeng/api';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { OpenNoteBoxComponent } from './openNoteBox.component';
import { DocumentViewer } from './dialog/documentViewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { EditInsDetailsComponent } from './edit-ins-details/edit-ins-details.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EditEduDetailsComponent } from './edit-edu-details/edit-edu-details.component';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({

  declarations: [ViewComponent,OpenNoteBoxComponent,
    DocumentViewer,EditInsDetailsComponent,EditEduDetailsComponent

  ],
  imports: [
    CommonModule,
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
    MessagesModule,
    MessageModule,
    NbSpinnerModule,
    NbSelectModule, 
    NbDatepickerModule,
    NbStepperModule,
    NbAccordionModule,
    InputSwitchModule,
    ConfirmDialogModule,
    FileUploadModule,
    DialogModule,
    PdfViewerModule,
    MatAutocompleteModule,
    MatNativeDateModule

  ],
  entryComponents : [ 
    OpenNoteBoxComponent,
    DocumentViewer
  ],  

  providers: [ConfirmationService]
})
export class ViewModule { }
