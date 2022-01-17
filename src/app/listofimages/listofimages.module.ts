import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListofimagesPageRoutingModule } from './listofimages-routing.module';

import { ListofimagesPage } from './listofimages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListofimagesPageRoutingModule
  ],
  declarations: [ListofimagesPage]
})
export class ListofimagesPageModule {}
