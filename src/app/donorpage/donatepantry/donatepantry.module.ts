import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonatepantryPageRoutingModule } from './donatepantry-routing.module';

import { DonatepantryPage } from './donatepantry.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonatepantryPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [DonatepantryPage]
})
export class DonatepantryPageModule {}
