import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatecategoryPage } from './updatecategory.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatecategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatecategoryPageRoutingModule {}
