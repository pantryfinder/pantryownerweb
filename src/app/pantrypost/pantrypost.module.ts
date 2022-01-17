import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PantrypostPageRoutingModule } from './pantrypost-routing.module';

import { PantrypostPage } from './pantrypost.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PantrypostPageRoutingModule
  ],
  declarations: [PantrypostPage]
})
export class PantrypostPageModule {}
