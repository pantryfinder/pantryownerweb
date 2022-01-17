import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonorpantrydetailsPageRoutingModule } from './donorpantrydetails-routing.module';

import { DonorpantrydetailsPage } from './donorpantrydetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonorpantrydetailsPageRoutingModule
  ],
  declarations: [DonorpantrydetailsPage]
})
export class DonorpantrydetailsPageModule {}
