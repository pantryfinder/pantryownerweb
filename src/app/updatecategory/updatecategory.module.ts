import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatecategoryPageRoutingModule } from './updatecategory-routing.module';

import { UpdatecategoryPage } from './updatecategory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatecategoryPageRoutingModule
  ],
  declarations: [UpdatecategoryPage]
})
export class UpdatecategoryPageModule {}
