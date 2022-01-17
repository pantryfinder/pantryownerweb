import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListofpantryPageRoutingModule } from './listofpantry-routing.module';

import { ListofpantryPage } from './listofpantry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListofpantryPageRoutingModule
  ],
  declarations: [ListofpantryPage]
})
export class ListofpantryPageModule {}
