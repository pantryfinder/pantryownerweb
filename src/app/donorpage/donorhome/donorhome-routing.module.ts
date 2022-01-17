import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonorhomePage } from './donorhome.page';

const routes: Routes = [
  {
    path: '',
    component: DonorhomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonorhomePageRoutingModule {}
