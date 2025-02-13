import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './help.component';
import { NbAccordionModule, NbCardModule } from '@nebular/theme';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
      CommonModule,
      NbCardModule,
      NbAccordionModule
    ],
    declarations: [HelpComponent]
    
  })
  export class HelpModule {
  }