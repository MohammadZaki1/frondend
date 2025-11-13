import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { StudentVerificationComponent } from './student-verification/student-verification.component';
import { FirstSuccessComponent } from './paymentrequests/FirstSuccess.component';
import { FirstCancelComponent } from './paymentrequests/FirstCancel.component';
import { FirstFailureComponent } from './paymentrequests/FirstFailure.component';
import { ApplicationComponent } from './student-verification/application/application.component';

import { RegisteredAgentComponent } from './admin/adminapplication/RegisteredAgent/RegisteredAgent.component';
import { HelpComponent } from './help/help.component';
import { AgentDashboardComponent } from './agent/agent-dashboard/agent-dashboard.component';
import { TotalAppliedComponent } from './admin/adminapplication/totalApplications/TotalApplied.component';
import { PaidApplicationComponent } from './admin/adminapplication/PaidApplication/PaidApplication.component';
import { RegisteredUserComponent } from './admin/adminapplication/RegisteredUser/RegisteredUser.component';
import { StudentDashboardComponent } from './user/student-dashboard/student-dashboard.component';
import { FaqComponent } from './faq/faq.component';
import { ErrataApplicationComponent } from './admin/adminapplication/ErrataApplication/ErrataApplication.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentApplicationComponent } from './student-application/student-application.component';
import { AdminPendingComponent } from './admin/admin-pending/admin-pending.component';
import { ViewComponent } from './view/view.component';
import { AdminVerifiedComponent } from './admin/admin-verified/admin-verified.component';
import { AdminSignedComponent } from './admin/admin-signed/admin-signed.component';
import { AdminEmailedComponent } from './admin/admin-emailed/admin-emailed.component';
import { AddStudentComponent } from './agent/add-student/add-student.component';
import { thirdPartyApplicationComponent } from './agent/third-party-apply/third-party-application.component';
import { ListStudentsComponent } from './agent/list-students/list-students.component';
import { ViewApplicationsComponent } from './agent/view-applications/view-applications.component';
import { MyapplicationComponent } from './myapplication/myapplication.component';
import { AdminPrintComponent } from './admin/admin-print/admin-print.component';
import { StudentFeedbackComponent } from './admin/student-feedback/student-feedback.component';
import { AdminTotalComponent } from './admin/admin-total/admin-total.component';
import { StudentManagementComponent } from './admin/student-management/student-management.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import{PaymentsComponent} from './admin/payments/payments.component'
import { RoleManagementComponent } from './admin/role-management/role-management.component';
import { ReportComponent } from './admin/report/report.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'Myapplication',
      component:MyapplicationComponent,
    },
    {
      path: 'agent-dashboard',
      component:AgentDashboardComponent,
    },
    {
      path: 'student-application-old',
      component:StudentDashboardComponent,
    },
    {
      path: 'student-verification',
      component:StudentDashboardComponent,

    },
    {
      path: 'faq',
      component:FaqComponent,

    },
    {
      path: 'contact-us',
      component:ContactUsComponent,

    },
    {
      path: 'admindashboard',
      component:AdminDashboardComponent,
    },
    {
      path : 'adminpayment',
      component : PaymentsComponent,
    },
    {
      path: 'adminTotal',
      component:AdminTotalComponent,
    },
    {
      path : 'adminPending',
      component : AdminPendingComponent
    },
    {
      path : 'adminVerified',
      component : AdminVerifiedComponent
    },
    {
      path : 'adminSigned',
      component : AdminSignedComponent
    },
    {
      path : 'studentfeedback',
      component : StudentFeedbackComponent,
    },
    {
      path : 'adminPrint',
      component : AdminPrintComponent
    },
    {
      path : 'adminEmailed',
      component : AdminEmailedComponent
    },
    {
      path : 'adminView',
      component : ViewComponent
    },
    {
      path : 'agentAddStudent',
      component : AddStudentComponent
    },
    {
      path : 'agentAddApplication/:user_id',
      component : thirdPartyApplicationComponent
    },
    {
      path : 'listAgentApplication',
      component : ListStudentsComponent
    },
    {
      path: 'PaidApplication',
      component: PaidApplicationComponent,
    },
    {
      path: 'ErrataApplication',
      component: ErrataApplicationComponent,
    },

    {
      path: 'RegisteredAgent',
      component: RegisteredAgentComponent,
    },

    {
      path: 'RegisteredUser',
      component: RegisteredUserComponent,
    },

    {
      path: 'TotalApplied',
      component: TotalAppliedComponent,
    },
    {
      path: 'FirstSuccess',
      component: FirstSuccessComponent,
    }, 
    {
      path : 'FirstCancel',
      component : FirstCancelComponent,
    },
    {
      path : 'FirstFailure',
      component : FirstFailureComponent,
    },
    {
      path : 'application',
      component : ApplicationComponent,
    },
    {
      path : 'student-dashboard',
      component : DashboardComponent,
    },
    {
      path : 'student-dashboard/application',
      component : StudentApplicationComponent,
    },
    {
      path : 'viewApplication/:user_id',
      component : ViewApplicationsComponent,
    },
    {
      path : 'help',
      component : HelpComponent,
    },
    {
      path : 'studentmanagement',
      component : StudentManagementComponent
    },
    {
      path : 'rolemanagement',
      component : RoleManagementComponent
    },
    {
      path : 'adminReport',
      component : ReportComponent
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: '',
      redirectTo: 'student-dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
