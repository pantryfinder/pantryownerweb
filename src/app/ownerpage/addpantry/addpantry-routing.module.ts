import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddpantryPage } from './addpantry.page';

const routes: Routes = [
  {
    path: '',
    component: AddpantryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddpantryPageRoutingModule {}
