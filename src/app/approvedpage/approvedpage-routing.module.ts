import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovedpagePage } from './approvedpage.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovedpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovedpagePageRoutingModule {}
