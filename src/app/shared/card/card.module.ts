import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { PipesModule } from '../pipes/pipes.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, PipesModule, RouterModule],
  exports: [CardComponent],
})
export class CardModule {}
