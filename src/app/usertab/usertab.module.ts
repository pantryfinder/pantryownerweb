import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsertabPageRoutingModule } from './usertab-routing.module';

import { UsertabPage } from './usertab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsertabPageRoutingModule
  ],
  declarations: [UsertabPage]
})
export class UsertabPageModule {}
