import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MypantryPage } from './mypantry.page';

const routes: Routes = [
  {
    path: '',
    component: MypantryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MypantryPageRoutingModule {}
