import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListofpantryPage } from './listofpantry.page';

const routes: Routes = [
  {
    path: '',
    component: ListofpantryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListofpantryPageRoutingModule {}
