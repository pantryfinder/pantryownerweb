import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendmessageownerPageRoutingModule } from './sendmessageowner-routing.module';

import { SendmessageownerPage } from './sendmessageowner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendmessageownerPageRoutingModule
  ],
  declarations: [SendmessageownerPage]
})
export class SendmessageownerPageModule {}
