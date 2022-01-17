import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonorpantrydetailsPage } from './donorpantrydetails.page';

const routes: Routes = [
  {
    path: '',
    component: DonorpantrydetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonorpantrydetailsPageRoutingModule {}
