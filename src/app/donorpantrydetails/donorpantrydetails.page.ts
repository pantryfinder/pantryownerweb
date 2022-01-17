import { Component, OnInit } from '@angular/core';
import { AccessProviders } from '../providers/access.providers';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { PantryService, community_pantry } from 'src/app/services/pantry.service';
import { ModalController } from '@ionic/angular';
import { RecommendationService, recommendation } from 'src/app/services/recommendation.service';


import { IonTabs } from '@ionic/angular';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-donorpantrydetails',
  templateUrl: './donorpantrydetails.page.html',
  styleUrls: ['./donorpantrydetails.page.scss'],
})
export class DonorpantrydetailsPage implements OnInit {

  pantry: any = [];
  pantry_id: any;
  phone_number: string="";

  term;


  user_fname: string = "";
  user_lname: string = "";
  user_mname: string = "";
  address: string = "";
  email: string ="";
  date_of_donation: string = "";

  transaction: string = ""
  user_id: any;
  datastorage: any;
  user_contact: string= "";
  user_email: string = "";
  pantry_name: string="";
  disabledButton;
  public recommendation=[];
  users = []
 

 

  sliderOpts = {
    zoom:false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20
  };



 
  constructor(private service: PantryService,   
     private actRoute: ActivatedRoute, private accsPrvdrs: AccessProviders, 
     private storage: Storage,  private router:Router, 
     private loadingCtrl: LoadingController,  private alertController: AlertController,
     private toastCtrl: ToastController, private alertCtrl: AlertController,  public recommendationService: RecommendationService,) {}

  ngOnInit() {
    this.actRoute.params.subscribe((data: any)=>{
      console.log(data);
      this.pantry_id = data.pantry_id;
      

      if(this.pantry_id!=0){
        this.loaddonors();
              
         
      }
    
    });

  }

    ionViewDidEnter(){
          
          this.actRoute.params.subscribe((data: any)=>{
            console.log(data);
            this.pantry_id = data.pantry_id;
 
            if(this.pantry_id!=0){
              this.loaddonors();
            }     
         });
          this.storage.get('storage_xxx').then((res)=>{
            console.log(res);
            this.datastorage = res;
            this.user_id = this.datastorage.user_id;  
            this.loadUser();
            
        });
      
        this.numberofdonors();
      //  this.loadPantry();
      }
 
  
  async doRefresh(event){
    const loader = await this.loadingCtrl.create({
      message: 'Please wait....',
    });
      loader.present();

      this.ngOnInit();
      event.target.complete();

      loader.dismiss();
  }

  async loaddonors(){
    const load = await this.loadingCtrl.create({
      message : "Loading....",
     });
    
    
    return new Promise(resolve => {
      let data = {  
        aksi: 'load_pantry',
        user_id: this.user_id,
        pantry_id: this.pantry_id,
      }

      this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
        this.pantry_name  = res.result.pantry_name;
        this.phone_number = res.result.phone_number;
    }) 
         
    });
  }


  loadUser(){
    return new Promise(resolve => {
      let body = {
        aksi: 'load_donordata',
        user_id: this.user_id,
      }

      this.accsPrvdrs.postData(body, 'proses_api.php').subscribe((res:any)=>{
        this.user_fname  = res.result.user_fname;
        this.user_lname  = res.result.user_lname;
        this.user_contact = res.result.user_contact;
        this.user_email = res.result.user_email;
     
      })
    
    });

  }

   async donate(a){
    
    if(this.address==""){      
      this.presentToast('Please enter your address');
    }else if(this.date_of_donation==""){
      this.presentToast('Please enter your date of donation');
    }else if(this.transaction==""){
      this.presentToast('Please enter your type of transaction');
    }else {

    const alert = await this.alertController.create({
      
      header: "Alert",
      message: "Do you really want to submit this donation?",
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
           
            return new Promise(resolve => {
              let body = {
                aksi: 'prosess_donation',
                user_id: this.user_id,
                pantry_id: this.pantry_id,
                user_fname: this.user_fname,
                user_lname: this.user_lname,
                address: this.address,
               // user_email: this.user_email,
                user_contact: this.user_contact,
                date_of_donation: this.date_of_donation,
                transaction: this.transaction,
                action: a
                
              }
              
              this.accsPrvdrs.postData(body,'process_donation.php').subscribe((res:any)=>{
                if(res.success==true){
                  alert.dismiss();
                  this.disabledButton = false;
                  console.log(res);
                  this.presentToast(res.msg);
                  //this.sendsms();
                  this.router.navigate(['/donorpage/confirm']);
                }else {
                  alert.dismiss();
                  this.disabledButton = false;
                  this.presentToast(res.msg);
                }
             }, (err) => {
              alert.dismiss();
               this.disabledButton = false;
               this.presentAlert('Successful');
             });
             
            });
          
          },
        },
      ],
     
    });
  
    await alert.present();
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
            this.router.navigate(['/donorpage/confirm']);
          }
        }
      ]
    });

    await alert.present();
}

async sendsms(){

  const load = await this.loadingCtrl.create({
    message : "Loading....",
   });
  
  
  return new Promise(resolve => {
    let data = {
      aksi: 'send', 
      pantry_id: this.pantry_id,
      phone_number: this.phone_number
         
    }

    this.accsPrvdrs.postData(data, 'message.php').subscribe((res:any)=>{

  }) 
  });

  
}

numberofdonors(){
  return new Promise(resolve => {
    let body = {
      aksi: 'numberofdonors',
      pantry_id: this.pantry_id,
    }

    this.accsPrvdrs.postData(body, 'proses_api.php').subscribe((res:any)=>{
      if(res.success==true){
        for(let datas of res.result){
          this.users.push(datas);
        }
      }else{
      }
  },(err)=>{
     
    }) 
  });
 }


}