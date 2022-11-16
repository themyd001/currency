import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { GraphsComponent } from './graphs.component';

@NgModule({
  declarations: [GraphsComponent],
  imports: [CommonModule, NgChartsModule],
  exports: [GraphsComponent],
})
export class GraphsModule {}
