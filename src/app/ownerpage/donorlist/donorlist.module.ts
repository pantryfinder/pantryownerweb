import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonorlistPageRoutingModule } from './donorlist-routing.module';

import { DonorlistPage } from './donorlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonorlistPageRoutingModule
  ],
  declarations: [DonorlistPage]
})
export class DonorlistPageModule {}
