import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnerprofilePageRoutingModule } from './ownerprofile-routing.module';

import { OwnerprofilePage } from './ownerprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnerprofilePageRoutingModule
  ],
  declarations: [OwnerprofilePage]
})
export class OwnerprofilePageModule {}
