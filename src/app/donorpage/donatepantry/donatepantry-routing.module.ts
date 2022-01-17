import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonatepantryPage } from './donatepantry.page';

const routes: Routes = [
  {
    path: '',
    component: DonatepantryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonatepantryPageRoutingModule {}
