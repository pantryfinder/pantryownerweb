import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopdonorsPage } from './topdonors.page';

const routes: Routes = [
  {
    path: '',
    component: TopdonorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopdonorsPageRoutingModule {}
