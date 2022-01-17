import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PantrydetailsPage } from './pantrydetails.page';

const routes: Routes = [
  {
    path: '',
    component: PantrydetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PantrydetailsPageRoutingModule {}
