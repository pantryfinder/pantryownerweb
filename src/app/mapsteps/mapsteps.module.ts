import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapstepsPageRoutingModule } from './mapsteps-routing.module';

import { MapstepsPage } from './mapsteps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapstepsPageRoutingModule
  ],
  declarations: [MapstepsPage]
})
export class MapstepsPageModule {}
