import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnerhomePageRoutingModule } from './ownerhome-routing.module';

import { OwnerhomePage } from './ownerhome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnerhomePageRoutingModule
  ],
  declarations: [OwnerhomePage]
})
export class OwnerhomePageModule {}
