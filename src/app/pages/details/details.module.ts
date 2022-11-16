import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorModule } from '../../shared/calculator/calculator.module';
import { GraphsModule } from '../../shared/graphs/graphs.module';

const routes: Routes = [
  {
    path: '',
    component: DetailsComponent,
  },
];

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CalculatorModule,
    GraphsModule,
  ],
})
export class DetailsModule {}
