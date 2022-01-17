import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListofdonationPage } from './listofdonation.page';

const routes: Routes = [
  {
    path: '',
    component: ListofdonationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListofdonationPageRoutingModule {}
