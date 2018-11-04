import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardGanttComponent } from './components/board-gantt/board-gantt.component';

@NgModule({
  declarations: [BoardGanttComponent],
  imports: [CommonModule, BoardRoutingModule]
})
export class BoardModule {}
