import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnerrecommendationsPageRoutingModule } from './ownerrecommendations-routing.module';

import { OwnerrecommendationsPage } from './ownerrecommendations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnerrecommendationsPageRoutingModule
  ],
  declarations: [OwnerrecommendationsPage]
})
export class OwnerrecommendationsPageModule {}
