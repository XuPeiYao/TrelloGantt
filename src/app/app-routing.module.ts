import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitComponent } from './components/init/init.component';

const routes: Routes = [
  {
    path: 'board/:id',
    loadChildren: './board/board.module#BoardModule'
  },
  {
    path: 'card/:id',
    loadChildren: './card/card.module#CardModule'
  },
  {
    path: '',
    pathMatch: 'full',
    component: InitComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
