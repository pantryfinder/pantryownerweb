import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatedonorprofilePageRoutingModule } from './updatedonorprofile-routing.module';

import { UpdatedonorprofilePage } from './updatedonorprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatedonorprofilePageRoutingModule
  ],
  declarations: [UpdatedonorprofilePage]
})
export class UpdatedonorprofilePageModule {}
