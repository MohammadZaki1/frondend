/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { AuthModule } from './@auth/auth.module';
import { FirstCancelModule } from "./pages/paymentrequests/FirstCancel.module";
import { FirstFailureModule } from "./pages/paymentrequests/FirstFailure.module";
import { FirstSuccessModule } from "./pages/paymentrequests/FirstSuccess.module";
import { Ng2TelInputModule } from 'ng2-tel-input';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbCardModule,
  NbTabsetModule,
  } from '@nebular/theme';
import { AgentDashboardModule } from './pages/agent/agent-dashboard/AgentDashboard.module';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { SafePipeModule } from 'safe-pipe';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileUploadModule } from "primeng/fileupload";
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DocumentViewer } from './pages/student-application/dialog/documentViewer.component';
import { FeedbackComponent } from './pages/paymentrequests/feedback.component';
import { AdminTotalModule } from "./pages/admin/admin-total/admin-total.module";


@NgModule({
  declarations: [AppComponent,FeedbackComponent],
  imports: [
    BrowserModule,
    AdminTotalModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FileUploadModule,
    PdfViewerModule,
    MatSelectModule,
    MatCheckboxModule,
    AppRoutingModule,
    FirstSuccessModule,
    FirstCancelModule,
    FirstFailureModule,
    AgentDashboardModule,
    FormsModule,
    NbCardModule,
    AgentDashboardModule,
    NgImageFullscreenViewModule,

    AuthModule.forRoot(),
    NbDatepickerModule.forRoot(),
    ReactiveFormsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbTabsetModule,
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    Ng2TelInputModule

  ],
  bootstrap: [AppComponent],
  providers: [],
  entryComponents:[DocumentViewer,FeedbackComponent]
})
export class AppModule {
}
