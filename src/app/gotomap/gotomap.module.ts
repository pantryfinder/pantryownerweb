import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GotomapPageRoutingModule } from './gotomap-routing.module';

import { GotomapPage } from './gotomap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GotomapPageRoutingModule
  ],
  declarations: [GotomapPage]
})
export class GotomapPageModule {}
