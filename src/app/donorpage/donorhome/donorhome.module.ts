import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonorhomePageRoutingModule } from './donorhome-routing.module';

import { DonorhomePage } from './donorhome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonorhomePageRoutingModule
  ],
  declarations: [DonorhomePage]
})
export class DonorhomePageModule {}
