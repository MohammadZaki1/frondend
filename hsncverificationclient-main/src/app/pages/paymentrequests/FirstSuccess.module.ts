import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { FirstSuccessComponent } from './FirstSuccess.component';
import { NbAccordionModule ,NbCardModule} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NbAccordionModule,
    FormsModule,
    NbCardModule,
   
  ],
  declarations: [
    FirstSuccessComponent,
  ],
  providers: []
})
export class FirstSuccessModule {
}