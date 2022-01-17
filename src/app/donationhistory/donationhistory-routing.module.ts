import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonationhistoryPage } from './donationhistory.page';

const routes: Routes = [
  {
    path: '',
    component: DonationhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonationhistoryPageRoutingModule {}
