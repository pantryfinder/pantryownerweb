import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AccessProviders } from './providers/access.providers';
import { IonicStorageModule } from '@ionic/storage';
import {  ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),
     HttpClientModule,
     IonicStorageModule.forRoot(),
      AppRoutingModule,
      ReactiveFormsModule
    ],
  providers: [ AccessProviders,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Geolocation],
  bootstrap: [AppComponent],
})
export class AppModule {}
