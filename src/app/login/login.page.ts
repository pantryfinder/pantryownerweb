import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../providers/access.providers';
import { Storage } from '@ionic/storage';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  username: string = "";
  password: string = "";
  usertype1 = "Owner";
  usertype2 = "Donor";
 
  disabledButton;
  



  constructor(
    private router:Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvdrs: AccessProviders,
    private storage: Storage,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
   

    
  }
  ionViewDidEnter(){
    this.disabledButton = false;
  }

  async tryLogin(){
    if(this.username==""){
      this.presentToast('Username is Required');
    }else if(this.password==""){
      this.presentToast('Password is Required');
    }
  else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait....',
      });
      loader.present();

      return new Promise( resolve => {
        let body = {
          aksi: 'proses_login',
          user_type: this.usertype1,
          username: this.username,
          password: this.password
        }
        this.accsPrvdrs.postData(body, 'proses_api.php').subscribe((res:any)=>{
            if(res.success==true){
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast('Login Successfully!');
              this.storage.set('storage_xxx', res.result); // create storage session
              this.navCtrl.navigateRoot(['/ownerpage']);

            }else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast('Username or password is wrong');
            }
        }, (err) => {
          loader.dismiss();
          this.disabledButton = false;
          this.presentToast('Account information is wrong, please type it correctly');
        });
      
      });
    }
}

async donor(){
  if(this.username==""){
    this.presentToast('Username is Required');
  }else if(this.password==""){
    this.presentToast('Password is Required');
  }
 else {
    this.disabledButton = true;
    const loader = await this.loadingCtrl.create({
      message: 'Please wait....',
    });
    loader.present();

    return new Promise( resolve => {
      let body = {
        aksi: 'proses_login',
        user_type: this.usertype2,
        username: this.username,
        password: this.password
        
      }
      this.accsPrvdrs.postData(body, 'proses_api.php').subscribe((res:any)=>{
          if(res.success==true){
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Login Successfully!');
            this.storage.set('storage_xxx', res.result); // create storage session
            this.navCtrl.navigateRoot(['/donorpage']);

          }else {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Username or password is wrong');
          }
      }, (err) => {
        loader.dismiss();
        this.disabledButton = false;
        this.presentToast('Youre not a Donor');
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


  openRegister(){
    this.router.navigate(['/register']);
  }

}
