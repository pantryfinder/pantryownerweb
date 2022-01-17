import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonorpagePage } from './donorpage.page';

const routes: Routes = [
  {
    path: '',
    component: DonorpagePage,
    children: [
  
  {
    path: 'donorprofile',
    loadChildren: () => import('./donorprofile/donorprofile.module').then( m => m.DonorprofilePageModule)
  },
  {
    path: 'donorhistory',
    loadChildren: () => import('./donorhistory/donorhistory.module').then( m => m.DonorhistoryPageModule)
  },
  {
    path: 'donatepantry',
    loadChildren: () => import('./donatepantry/donatepantry.module').then( m => m.DonatepantryPageModule)
  },
  {
    path: 'donorhome',
    loadChildren: () => import('./donorhome/donorhome.module').then( m => m.DonorhomePageModule)
  },
  {
    path: 'listofpantry',
    loadChildren: () => import('./listofpantry/listofpantry.module').then( m => m.ListofpantryPageModule)
  },
  

  {
    path: '',
    redirectTo: '/donorpage/donorprofile',
    pathMatch: 'full'
  }
],
  },
  {
    path: 'donorhistory',
    loadChildren: () => import('./donorhistory/donorhistory.module').then( m => m.DonorhistoryPageModule)
  },
  {
    path: 'donatepantry',
    loadChildren: () => import('./donatepantry/donatepantry.module').then( m => m.DonatepantryPageModule)
  },
  {
    path: 'donorhome',
    loadChildren: () => import('./donorhome/donorhome.module').then( m => m.DonorhomePageModule)
  },
  {
    path: 'listofpantry',
    loadChildren: () => import('./listofpantry/listofpantry.module').then( m => m.ListofpantryPageModule)
  },
  {
    path: 'confirm',
    loadChildren: () => import('./confirm/confirm.module').then( m => m.ConfirmPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonorpagePageRoutingModule {}
