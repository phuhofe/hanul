import { NgModule } from '@angular/core';

import { RowNamePipe } from './row-name.pipe';
import { RowValuePipe } from './row-value.pipe';
@NgModule({
  declarations: [
    RowNamePipe,
    RowValuePipe
  ],
  exports: [
    RowNamePipe,
    RowValuePipe
  ],
})
export class RowNamePipeModule { }