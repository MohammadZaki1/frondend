import { NgModule, } from '@angular/core';

import { FilterPipe} from '../pipe/filter.pipe';
import { AuthPipe } from '../pipe/auth-pipe.pipe';

@NgModule({
  imports: [
  ],
  declarations: [
    AuthPipe,
    FilterPipe
  ],
  exports: [
    AuthPipe,
    FilterPipe
  ]
})

export class SharedModule { }