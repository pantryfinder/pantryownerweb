import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddpantryPageRoutingModule } from './addpantry-routing.module';

import { AddpantryPage } from './addpantry.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddpantryPageRoutingModule
  ],
  declarations: [AddpantryPage]
})
export class AddpantryPageModule {}
