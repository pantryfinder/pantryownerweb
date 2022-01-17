import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatedonorprofilePage } from './updatedonorprofile.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatedonorprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatedonorprofilePageRoutingModule {}
