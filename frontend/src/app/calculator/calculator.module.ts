import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator/calculator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { TranslocoLoaderModule } from '@app/transloco-root/transloco-root.module';

@NgModule({
  declarations: [CalculatorComponent],
  exports: [CalculatorComponent],
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    TranslocoLoaderModule,
  ],
})
export class CalculatorModule {}
