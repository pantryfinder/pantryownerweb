import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonorhistoryPageRoutingModule } from './donorhistory-routing.module';

import { DonorhistoryPage } from './donorhistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonorhistoryPageRoutingModule
  ],
  declarations: [DonorhistoryPage]
})
export class DonorhistoryPageModule {}
