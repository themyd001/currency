import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterPipe } from '../../core/pipe/currency-converter.pipe';

@NgModule({
  declarations: [CurrencyConverterPipe],
  imports: [CommonModule],
  exports: [CurrencyConverterPipe],
})
export class PipesModule {}
