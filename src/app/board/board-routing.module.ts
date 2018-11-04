import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardGanttComponent } from './components/board-gantt/board-gantt.component';

const routes: Routes = [
  {
    path: '',
    component: BoardGanttComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule {}
