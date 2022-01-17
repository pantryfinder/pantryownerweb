import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendmessageownerPage } from './sendmessageowner.page';

const routes: Routes = [
  {
    path: '',
    component: SendmessageownerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendmessageownerPageRoutingModule {}
