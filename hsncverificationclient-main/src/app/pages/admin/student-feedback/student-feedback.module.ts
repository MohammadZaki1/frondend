import { NgModule } from "@angular/core";
import {NbCardModule ,NbPopoverModule, NbActionsModule, NbButtonModule, NbAlertModule, NbProgressBarModule, NbInputModule} from '@nebular/theme';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';import {TabViewModule} from 'primeng/tabview';
import { StudentFeedbackComponent } from './student-feedback.component';


@NgModule({
    declarations:[StudentFeedbackComponent],
    imports:[
        NbCardModule,
        NbPopoverModule,
        NbActionsModule,
        NbButtonModule,
        NbAlertModule,
        NbProgressBarModule,
        NbInputModule,
        CommonModule,
        NgxPaginationModule,


    ]
})


export class StudentFeedbackModule{

}