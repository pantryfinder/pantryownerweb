import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopdonorsPageRoutingModule } from './topdonors-routing.module';

import { TopdonorsPage } from './topdonors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopdonorsPageRoutingModule
  ],
  declarations: [TopdonorsPage]
})
export class TopdonorsPageModule {}
