import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PantrydetailsPageRoutingModule } from './pantrydetails-routing.module';

import { PantrydetailsPage } from './pantrydetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PantrydetailsPageRoutingModule
  ],
  declarations: [PantrydetailsPage]
})
export class PantrydetailsPageModule {}
