import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router,  } from '@angular/router';
import { AlertController, LoadingController, ToastController, NavController, ActionSheetController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AccessProviders } from '../providers/access.providers';

@Component({
  selector: 'app-sendmessageowner',
  templateUrl: './sendmessageowner.page.html',
  styleUrls: ['./sendmessageowner.page.scss'],
})
export class SendmessageownerPage implements OnInit {

  ownermessages = []
  user_id: number;
  users = []
  lpm =[]
  pantry: any = [];
  pantry_id: number;
  donation_id: number;
  statusofdonate: string ="";
  user_fname: string ="";
  user_lname: string ="";

 message: string = "";
 disabledButton;
  
  datastorage: any;

  constructor(  
    public loadCtrl: LoadingController,   
    private accsPrvdrs: AccessProviders, 
    private toastCtrl: ToastController,
    private alertController: AlertController,
    private actRoute: ActivatedRoute,
    private storage: Storage) { }

 

  ngOnInit() {

    this.actRoute.params.subscribe((data: any)=>{
      console.log(data);
      this.donation_id = data.donation_id;
      
      if(this.donation_id!=0){
        this.users = [];
        this.loaddonors();
        this.lpm =[];
        this.loadpreviousmessage();
        
      }
     
    });
  }


  async loaddonors(){
    const load = await this.loadCtrl.create({
      message : "Loading....",
     });
    
    
    return new Promise(resolve => {
      let data = {
        aksi: 'load_donorinfo',
        donation_id: this.donation_id,
       
      }

      this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
        if(res.success==true){
          for(let datas of res.result){
            this.users.push(datas);
            console.log(datas);
            load.dismiss();
          }
      
        }else{
        load.dismiss();
        
        this.presentToast(res.msg);
        }
    },(err)=>{
      load.dismiss();
      
      this.presentToast("Cannot Load Data"); 
      }) 
         
    });
  }

  async sendmessage(a){
    
    if(this.message==""){      
      this.presentToast('Please enter your message');
    }else {
  
    const alert = await this.alertController.create({
      
      header: "",
      message: "Do you really want to send this message?",
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
                aksi: 'send_message',
                donation_id: this.donation_id,
                message: this.message,
                action: a
              }
              
              this.accsPrvdrs.postData(body,'messageofowner.php').subscribe((res:any)=>{
                if(res.success==true){
                  alert.dismiss();
                  this.disabledButton = false;
                  console.log(res);
                  this.presentToast(res.msg);
                //this.sendsms();
                //this.router.navigate(['/viewcomments/']);
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
      message : a,
      duration : 1500,
      position : 'top'
    });
    toast.present();
  }

  async presentAlert(a){
    const alert = await this.alertController.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: (blah) => {
            console.log('Successful');
            //this.router.navigate(['/donorpage/listofpantry']);
          }
        }
      ]
    });
  
    await alert.present();
  }

  async loadpreviousmessage(){
    const load = await this.loadCtrl.create({
      message : "Loading....",
     });
    
    
    return new Promise(resolve => {
      let data = {
        aksi: 'lprevmessage',
        donation_id: this.donation_id,
       
      }

      this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
        if(res.success==true){
          for(let datas of res.result){
            this.lpm.push(datas);
            console.log(datas);
            load.dismiss();
          }
      
        }else{
        load.dismiss();
        
        this.presentToast(res.msg);
        }
    },(err)=>{
      load.dismiss();
      
      this.presentToast("Cannot Load Data"); 
      }) 
         
    });
  }

}