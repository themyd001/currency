import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BaseComponent } from './base/base.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BaseComponent
  ],
  imports: [CommonModule],
})
export class LayoutModule {}
