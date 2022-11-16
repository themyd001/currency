import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator.component';
import { LoadingModule } from '../loading/loading.module';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [CalculatorComponent],
  imports: [
    CommonModule,
    LoadingModule,
    PipesModule,
    FormsModule,
    RouterModule,
  ],

  exports: [CalculatorComponent],
})
export class CalculatorModule {}
