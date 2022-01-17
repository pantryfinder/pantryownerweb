import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnerprofilePage } from './ownerprofile.page';

const routes: Routes = [
  {
    path: '',
    component: OwnerprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerprofilePageRoutingModule {}
