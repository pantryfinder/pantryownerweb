import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, LoadingController,ToastController,AlertController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public togglereply;
  result:any;
  results:any
  email_address: string = "";
  password: string = "";
  disabledButton; 
  private loading;
  
  constructor(
    private route:Router,
    private toastCtrl: ToastController,
     private http:HttpClient, 
     private navCtrl: NavController,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController,
      ) {
    //if(localStorage.getItem('userdata')){
    //  this.route.navigate(['/dashboard']);
    //}

  } 

  ionViewDidEnter(){
    this.disabledButton = false;
  }

  
  goToReset(){
    this.route.navigateByUrl('dashboard');
  }
  
   login(){

    this.loadingCtrl.create({
      message:'Logging In as Owner...'
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present();
    });

    setTimeout(() => {
      this.loading.dismiss();
       this.route.navigateByUrl('ownerpage');
    }, 1000);

   
   
  }
 


  donorpage(){
    this.loadingCtrl.create({
      message:'Logging In as Donor...'
    }).then((overlay) => {
      this.loading = overlay;
      this.loading.present(); 
    });

    setTimeout(() => {
      this.loading.dismiss();
       this.route.navigateByUrl('donorpage');
    }, 1000);
  }
 

}
