import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../providers/access.providers';
import { Storage } from '@ionic/storage';
import { IonTabs } from '@ionic/angular';


@Component({
  selector: 'app-ownerpage',
  templateUrl: './ownerpage.page.html',
  styleUrls: ['./ownerpage.page.scss'],
})
export class OwnerpagePage implements OnInit {

  datastorage: any;
 user_id: any;

  selectTab: any;
  @ViewChild('tabs') tabs: IonTabs;


  constructor(
    private router: Router, 
    private alertController: AlertController,
    private storage: Storage,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private accsPrvdrs: AccessProviders,

    ) { }

  ngOnInit() {
  }

  setCurrentTab(event) {
    console.log(event);    
    this.selectTab = this.tabs.getSelected();
  }
  
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      console.log(res);
      this.datastorage = res;
      this.user_id = this.datastorage.user_id;
      
    });
  }
  
  

  async log_out() {
    const alert = await this.alertController.create({
      
      header: "Alert",
      message: "Do you really want to log out?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          handler: () => {
            console.log("No");
           
          },
        },
        {
          text: "Yes",
          handler: () => {
            console.log("Yes");
            this.storage.clear();
            this.navCtrl.navigateRoot(['/pantrypost']);  
            const toast = this.toastCtrl.create({
              message: 'Logout Successfully',
               duration: 1500  
             });
          
          },
        },
      ],
     
    });
  
    await alert.present();
  }

  async logout(){
    this.storage.clear();
    this.navCtrl.navigateRoot(['/pantrypost']);
    const toast = await this.toastCtrl.create({
     message: 'Logout Successfully',
      duration: 1500  
    });
    toast.present();
  }

  account(){
    this.router.navigateByUrl('ownerpage/ownerprofile');
  }

  donorlist(){
    this.router.navigateByUrl('ownerpage/donorlist');
  }

  mypantry(){
    this.router.navigateByUrl('mypantry');
  }

  ownerprofile(){
    this.router.navigateByUrl('ownerpage/ownerprofile');
  }

  addpantry(){
    this.router.navigateByUrl('/ownerpage/addpantry');
  }
  listofpantry(){
    this.router.navigateByUrl('ownerpage/listofpantry');
  }
  map(){
    this.router.navigateByUrl('ownerpage/map');
  }


}
