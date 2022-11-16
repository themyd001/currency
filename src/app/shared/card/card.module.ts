import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, PipesModule],
  exports: [CardComponent],
})
export class CardModule {}
