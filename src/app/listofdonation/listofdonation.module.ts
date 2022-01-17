import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListofdonationPageRoutingModule } from './listofdonation-routing.module';

import { ListofdonationPage } from './listofdonation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListofdonationPageRoutingModule
  ],
  declarations: [ListofdonationPage]
})
export class ListofdonationPageModule {}
