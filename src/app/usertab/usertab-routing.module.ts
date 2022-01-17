import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsertabPage } from './usertab.page';

const routes: Routes = [
  {
    path: '',
    component: UsertabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsertabPageRoutingModule {}
