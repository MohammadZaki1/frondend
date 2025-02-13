import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PagesMenu } from './pages-menu';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbMenuModule,NbActionsModule, NbPopoverModule, NbStepperModule, NbSpinnerModule } from '@nebular/theme';
import { AuthModule } from '../@auth/auth.module';
import { StudentVerificationComponent } from './student-verification/student-verification.component';
import { ReactiveFormsModule } from '@angular/forms';
import {Firstpaymentdialog } from './student-verification/payment_dialog/paymentdialog';
import { FormsModule } from '@angular/forms';
import { ApplicationComponent } from './student-verification/application/application.component';
import { RegisteredUserComponent } from './admin/adminapplication/RegisteredUser/RegisteredUser.component';
import { Data } from '../../assets/data/data';
import { AgentDashboardComponent } from './agent/agent-dashboard/agent-dashboard.component';
import { AgentDashboardModule } from './agent/agent-dashboard/AgentDashboard.module';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { TotalAppliedComponent } from './admin/adminapplication/totalApplications/TotalApplied.component';
import { PaidApplicationComponent } from './admin/adminapplication/PaidApplication/PaidApplication.component';
import { RegisteredAgentComponent } from './admin/adminapplication/RegisteredAgent/RegisteredAgent.component';
import { ConfirmationDialogComponent } from './admin/adminapplication/totalApplications/dialogs/confirm/confirmation-dialog/confirmation-dialog.component';
import { ErrataDialogComponent } from './admin/adminapplication/totalApplications/dialogs/errata/errata-dialog/errata-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { StudentDashboardModule } from './user/student-dashboard/StudentDashboard.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfViewComponent } from './admin/adminapplication/totalApplications/dialogs/documentView/pdf-viewer/pdf-viewer.component';
import { ErrataApplicationComponent } from './admin/adminapplication/ErrataApplication/ErrataApplication.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { StudentApplicationModule } from './student-application/student-application.module';
import { AdminPendingModule } from './admin/admin-pending/admin-pending.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { ViewModule } from './view/view.module';
import { AdminVerifiedModule } from './admin/admin-verified/admin-verified.module';
import { AdminSignedModule } from './admin/admin-signed/admin-signed.module';
import { AdminEmailedModule } from './admin/admin-emailed/admin-emailed.module';
import { AddStudentModule } from './agent/add-student/add-student.module';
import { ListStudentsModule } from './agent/list-students/list-students.module';
import { MyapplicationComponent } from './myapplication/myapplication.component';
import { FileUploadModule } from 'primeng/fileupload';
import { HelpModule } from './help/help.module';
import { AdminPrintModule } from './admin/admin-print/admin-print.module';
import { StudentFeedbackModule } from './admin/student-feedback/student-feedback.module';
import {TabViewModule} from 'primeng/tabview';
import { SharedModule } from "./shared-authpipe.module";
import { StudentManagementModule } from './admin/student-management/student-management.module';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { PaymentsComponent } from './admin/payments/payments.component';
import { studentnotes } from '../pages/user/studentnotes.component'
import { NgxEchartsModule } from 'ngx-echarts';
import { RoleManagementModule } from './admin/role-management/role-management.module';
import { ReportModule } from './admin/report/report.module';



const PAGES_COMPONENTS = [
  PagesComponent,
  
];

@NgModule({
    declarations: [
        ...PAGES_COMPONENTS,
        StudentVerificationComponent,
        Firstpaymentdialog,
        ApplicationComponent,
        PaidApplicationComponent,
        ErrataApplicationComponent,
        RegisteredAgentComponent,
        RegisteredUserComponent,
        TotalAppliedComponent,
        ConfirmationDialogComponent,
        ErrataDialogComponent,
        PdfViewComponent,
        ContactUsComponent,
        MyapplicationComponent, 
        AdminDashboardComponent,
        PaymentsComponent,
        studentnotes

 
    ],
    providers: [
        PagesMenu,
        Data,
    ],
    entryComponents: [
        Firstpaymentdialog
    ],
    imports: [
        TabViewModule,
        PagesRoutingModule,
        ThemeModule,
        NbMenuModule,
        MiscellaneousModule,
        NbCardModule,
        ReactiveFormsModule,
        NbButtonModule,
        NbDatepickerModule,
        NbPopoverModule,
        FormsModule,
        NbAccordionModule,
        NbActionsModule,
        NgxPaginationModule,
        AuthModule.forRoot(),
        AgentDashboardModule,
        DashboardModule,
        AdminPrintModule,
        StudentDashboardModule,
        NgImageFullscreenViewModule,
        PdfViewerModule,
        StudentApplicationModule,
        FileUploadModule,
        AdminPendingModule,
        AdminVerifiedModule,
        AdminSignedModule,
        ViewModule,
        MatFormFieldModule,
        AdminEmailedModule,
        NbStepperModule,
        NbSpinnerModule,
        AddStudentModule,
        ListStudentsModule,
        HelpModule,
        StudentFeedbackModule,
        SharedModule,
        StudentManagementModule,
        NgxEchartsModule,
        RoleManagementModule,
        ReportModule
   
    ]
})
export class PagesModule {
}
