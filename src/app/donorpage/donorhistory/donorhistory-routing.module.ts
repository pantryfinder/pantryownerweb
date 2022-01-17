import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonorhistoryPage } from './donorhistory.page';

const routes: Routes = [
  {
    path: '',
    component: DonorhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonorhistoryPageRoutingModule {}
