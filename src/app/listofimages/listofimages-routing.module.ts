import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListofimagesPage } from './listofimages.page';

const routes: Routes = [
  {
    path: '',
    component: ListofimagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListofimagesPageRoutingModule {}
