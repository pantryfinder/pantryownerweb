import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovedpagePageRoutingModule } from './approvedpage-routing.module';

import { ApprovedpagePage } from './approvedpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApprovedpagePageRoutingModule
  ],
  declarations: [ApprovedpagePage]
})
export class ApprovedpagePageModule {}
