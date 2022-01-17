import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonationhistoryPageRoutingModule } from './donationhistory-routing.module';

import { DonationhistoryPage } from './donationhistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonationhistoryPageRoutingModule
    
  ],
  declarations: [DonationhistoryPage]
})
export class DonationhistoryPageModule {}
