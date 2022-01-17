import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-donorpage',
  templateUrl: './donorpage.page.html',
  styleUrls: ['./donorpage.page.scss'],
})
export class DonorpagePage implements OnInit {
  public togglereply;
  result:any;
  results:any;
  buttonValue = 'grid';
  constructor(private router:Router, 
  private http:HttpClient, private alertController: AlertController,
  private storage: Storage, private navCtrl: NavController,
  private toastCtrl: ToastController,) { }


  datastorage: any;
  
    fname: string;
    mname: string;
    lname: string;
    u_name: string;
    u_email: string;
    u_number: string;

    
  selectTab: any;
  @ViewChild('tabs') tabs: IonTabs;

     

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
      this.fname = this.datastorage.user_fname;
      this.mname = this.datastorage.user_mname;
      this.lname = this.datastorage.user_lname;
      this.u_name = this.datastorage.username;
      this.u_number = this.datastorage.user_contact;
      this.u_email = this.datastorage.user_email;
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

  
  donorprofile(){
    this.router.navigateByUrl('donorpage/donorhome');
  }

  buttonsChanged(event) {
    console.log(event.detail.value);
    this.buttonValue = event.detail.value;
  }
 
  listofpantry(){
    this.router.navigateByUrl('donorpage/listofpantry');
  }



  map(){
    this.router.navigateByUrl('donorpage/map');
  }

   donorhistory() {
    this.router.navigateByUrl('donationhistory');
   }

   
  
    

}
