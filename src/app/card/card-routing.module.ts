import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DependenciesComponent } from './components/dependencies/dependencies.component';

const routes: Routes = [
  {
    path: '',
    component: DependenciesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule {}
