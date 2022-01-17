import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnerhomePage } from './ownerhome.page';

const routes: Routes = [
  {
    path: '',
    component: OwnerhomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerhomePageRoutingModule {}
