import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatepantryPage } from './updatepantry.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatepantryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatepantryPageRoutingModule {}
