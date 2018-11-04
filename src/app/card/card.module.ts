import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { DependenciesComponent } from './components/dependencies/dependencies.component';

@NgModule({
  declarations: [DependenciesComponent],
  imports: [
    CommonModule,
    CardRoutingModule
  ]
})
export class CardModule { }
