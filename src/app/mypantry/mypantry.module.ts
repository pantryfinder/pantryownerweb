import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MypantryPageRoutingModule } from './mypantry-routing.module';

import { MypantryPage } from './mypantry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MypantryPageRoutingModule
  ],
  declarations: [MypantryPage]
})
export class MypantryPageModule {}
