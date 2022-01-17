import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GotomapPage } from './gotomap.page';

const routes: Routes = [
  {
    path: '',
    component: GotomapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GotomapPageRoutingModule {}
