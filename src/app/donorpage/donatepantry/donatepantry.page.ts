import { Component, OnInit } from '@angular/core';
import { PantryService, community_pantry } from 'src/app/services/pantry.service';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { ApiService } from '../../api.service';

import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AccessProviders } from '../../providers/access.providers';

@Component({
  selector: 'app-donatepantry',
  templateUrl: './donatepantry.page.html',
  styleUrls: ['./donatepantry.page.scss'],
})
export class DonatepantryPage implements OnInit {

  term;

  pantry: community_pantry[];

  user_fname: string = "";
  user_lname: string = "";
  user_mname: string = "";
  address: string = "";
  email: string = "";
  phone_number: string = "";
  date_of_donation: string = "";
  transaction: string = ""
  datastorage: any;
  user_id: any;
  pantry_id: string ="";
  

  disabledButton;

  constructor(
    public _apiService: ApiService,
    private router:Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvdrs: AccessProviders,
    private storage: Storage,
    ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      console.log(res);
      this.datastorage = res;
     this.user_id = this.datastorage.user_id;
     this.pantry_id = this.datastorage.pantry_id;
    });
  }

  async donate(){
      if(this.user_fname == ""){
          this.presentToast('Please select your user type');
      }else if(this.user_lname==""){
          this.presentToast('Please enter your username');
      }else if(this.address==""){
        this.presentToast('Please enter your first name');
      }else if(this.email==""){
        this.presentToast('Please enter your middle name');
      }else if(this.phone_number==""){
        this.presentToast('Please enter your last name');
      }else if(this.date_of_donation==""){
        this.presentToast('Please enter your phone number');
      }else if(this.transaction==""){
        this.presentToast('Please enter your middle name');
      }else {
        this.disabledButton = true;
        const loader = await this.loadingCtrl.create({
          message: 'Please wait....',
        });
        loader.present();

        return new Promise(resolve => {
          let body = {
            aksi: 'prosess_donation',
            user_id: this.user_id,
            user_fname: this.user_fname,
            user_lname: this.user_lname,
            address: this.address,
            email: this.email,
            phone_number: this.phone_number,
            date_of_donation: this.date_of_donation,
            transaction: this.transaction
          }

           this.accsPrvdrs.postData(body,'process_donation.php').subscribe((res:any)=>{
              if(res.success==true){
                loader.dismiss();
                this.disabledButton = false;
                console.log(res);
                this.presentToast(res.msg);
                this.router.navigate(['/donorpage/confirm']);
              }else {
                loader.dismiss();
                this.disabledButton = false;
                this.presentToast(res.msg);
              }
           }, (err) => {
             loader.dismiss();
             this.disabledButton = false;
             this.presentAlert('Successful');
           });         
        });
      }
  }

  async presentToast(a){
      const toast = await this.toastCtrl.create({
        message: a,
        duration: 1500,
        position: 'top'
      });
      toast.present();
  }

  async presentAlert(a){
      const alert = await this.alertCtrl.create({
        header: a,
        backdropDismiss: false,
        buttons: [
          {
            text: 'OK',
            handler: (blah) => {
              console.log('Successful');
              this.router.navigate(['/donorpage/listofpantry']);
            }
          }
        ]
      });

      await alert.present();
  }
 
 
}
