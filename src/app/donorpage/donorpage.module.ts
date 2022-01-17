import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonorpagePageRoutingModule } from './donorpage-routing.module';

import { DonorpagePage } from './donorpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonorpagePageRoutingModule
  ],
  declarations: [DonorpagePage]
})
export class DonorpagePageModule {}
