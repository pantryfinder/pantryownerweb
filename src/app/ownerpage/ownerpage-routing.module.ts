import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnerpagePage } from './ownerpage.page';

const routes: Routes = [
  {
    path: '',
    component: OwnerpagePage,
    children: [
      {
        path: 'ownerprofile',
        loadChildren: () => import('./ownerprofile/ownerprofile.module').then( m => m.OwnerprofilePageModule)
      },
      {
        path: 'addpantry',
        loadChildren: () => import('./addpantry/addpantry.module').then( m => m.AddpantryPageModule)
      },
      {
        path: 'donorlist',
        loadChildren: () => import('./donorlist/donorlist.module').then( m => m.DonorlistPageModule)
      },
      {
        path: 'listofpantry',
        loadChildren: () => import('./listofpantry/listofpantry.module').then( m => m.ListofpantryPageModule)
      },
      {
        path: 'ownerhome',
        loadChildren: () => import('./ownerhome/ownerhome.module').then( m => m.OwnerhomePageModule)
      },
      {
        path: 'mypantry',
        loadChildren: () => import('./mypantry/mypantry.module').then( m => m.MypantryPageModule)
      },
      {
        path: '',
        redirectTo: '/ownerpage/ownerhome',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'donorlist',
    loadChildren: () => import('./donorlist/donorlist.module').then( m => m.DonorlistPageModule)
  },
  {
    path: 'listofpantry',
    loadChildren: () => import('./listofpantry/listofpantry.module').then( m => m.ListofpantryPageModule)
  },
  {
    path: 'ownerhome',
    loadChildren: () => import('./ownerhome/ownerhome.module').then( m => m.OwnerhomePageModule)
  },
  {
    path: 'mypantry',
    loadChildren: () => import('./mypantry/mypantry.module').then( m => m.MypantryPageModule)
  },
  {
    path: 'confirm',
    loadChildren: () => import('./confirm/confirm.module').then( m => m.ConfirmPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerpagePageRoutingModule {}
