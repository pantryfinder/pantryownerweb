import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
 
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'pantrypost',
    loadChildren: () => import('./pantrypost/pantrypost.module').then( m => m.PantrypostPageModule)
  },
  {
    path: 'ownerpage',
    loadChildren: () => import('./ownerpage/ownerpage.module').then( m => m.OwnerpagePageModule)
  },
  {
    path: 'pantrydetails/:pantry_id',
    loadChildren: () => import('./pantrydetails/pantrydetails.module').then( m => m.PantrydetailsPageModule)
  },

  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'donorpage',
    loadChildren: () => import('./donorpage/donorpage.module').then( m => m.DonorpagePageModule)
  },
 
  {
    path: 'listofimages',
    loadChildren: () => import('./listofimages/listofimages.module').then( m => m.ListofimagesPageModule)
  },
  {
    path: 'tab',
    loadChildren: () => import('./tab/tab.module').then( m => m.TabPageModule)
  },

  {
    path: 'addpantry',
    loadChildren: () => import('./ownerpage/addpantry/addpantry.module').then( m => m.AddpantryPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'usertab',
    loadChildren: () => import('./usertab/usertab.module').then( m => m.UsertabPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'donorpantrydetails/:pantry_id',
    loadChildren: () => import('./donorpantrydetails/donorpantrydetails.module').then( m => m.DonorpantrydetailsPageModule)
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
    path: 'listofdonation/:pantry_id',
    loadChildren: () => import('./listofdonation/listofdonation.module').then( m => m.ListofdonationPageModule)
  },
  {
    path: 'donationhistory',
    loadChildren: () => import('./donationhistory/donationhistory.module').then( m => m.DonationhistoryPageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'update/:user_id',
    loadChildren: () => import('./update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'updatepantry/:pantry_id',
    loadChildren: () => import('./updatepantry/updatepantry.module').then( m => m.UpdatepantryPageModule)
  },

  {
    path: 'approved/:donation_id',
    loadChildren: () => import('./approved/approved.module').then( m => m.ApprovedPageModule)
  },
  {
    path: 'updatedonorprofile/:user_id',
    loadChildren: () => import('./updatedonorprofile/updatedonorprofile.module').then( m => m.UpdatedonorprofilePageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./aboutus/aboutus.module').then( m => m.AboutusPageModule)
  },
  {
    path: 'gotomap',
    loadChildren: () => import('./gotomap/gotomap.module').then( m => m.GotomapPageModule)
  },
  {
    path: 'termsandcondition',
    loadChildren: () => import('./termsandcondition/termsandcondition.module').then( m => m.TermsandconditionPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'viewcomments/:pantry_id',
    loadChildren: () => import('./viewcomments/viewcomments.module').then( m => m.ViewcommentsPageModule)
  },
  {
    path: 'recommendations',
    loadChildren: () => import('./recommendations/recommendations.module').then( m => m.RecommendationsPageModule)
  },
  {
    path: 'ownerrecommendations',
    loadChildren: () => import('./ownerrecommendations/ownerrecommendations.module').then( m => m.OwnerrecommendationsPageModule)
  },
  {
    path: 'approvedpage',
    loadChildren: () => import('./approvedpage/approvedpage.module').then( m => m.ApprovedpagePageModule)
  },
  {
    path: 'updatestatus/:pantry_id',
    loadChildren: () => import('./updatestatus/updatestatus.module').then( m => m.UpdatestatusPageModule)
  },
  {
    path: 'mapsteps',
    loadChildren: () => import('./mapsteps/mapsteps.module').then( m => m.MapstepsPageModule)
  },
  {
    path: 'topdonors',
    loadChildren: () => import('./topdonors/topdonors.module').then( m => m.TopdonorsPageModule)
  },
  {
    path: 'updatecategory/:pantry_id',
    loadChildren: () => import('./updatecategory/updatecategory.module').then( m => m.UpdatecategoryPageModule)
  },
  {
    path: 'sendmessageowner/:donation_id',
    loadChildren: () => import('./sendmessageowner/sendmessageowner.module').then( m => m.SendmessageownerPageModule)
  },
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }