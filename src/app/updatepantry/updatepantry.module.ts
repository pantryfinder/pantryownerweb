import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatepantryPageRoutingModule } from './updatepantry-routing.module';

import { UpdatepantryPage } from './updatepantry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatepantryPageRoutingModule
  ],
  declarations: [UpdatepantryPage]
})
export class UpdatepantryPageModule {}
