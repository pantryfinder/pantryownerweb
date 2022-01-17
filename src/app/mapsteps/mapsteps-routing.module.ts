import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapstepsPage } from './mapsteps.page';

const routes: Routes = [
  {
    path: '',
    component: MapstepsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapstepsPageRoutingModule {}
