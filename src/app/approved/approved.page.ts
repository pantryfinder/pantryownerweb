import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router,  } from '@angular/router';
import { AlertController, LoadingController, ToastController, NavController, ActionSheetController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AccessProviders } from '../providers/access.providers';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.page.html',
  styleUrls: ['./approved.page.scss'],
})
export class ApprovedPage implements OnInit {

  constructor(private route: Router,
    private http: HttpClient,
    private alertController: AlertController,
    public loadCtrl: LoadingController,
    public AlertCtrl: AlertController,
    private navCtrl: NavController,
    private actionCtrl: ActionSheetController,
    private storage: Storage,
    private router: Router,
    private actRoute: ActivatedRoute,
    private toastCtrl: ToastController,
    private accsPrvdrs: AccessProviders,
    private modalCtrl: ModalController) { }
  datastorage: any;

  user_id: number;
  users = []
  pantry: any = [];
  pantry_id: number;
  donation_id: number;
  statusofdonate: string ="";
  

  user_contact: string="";
  disabledButton;

  ngOnInit() {
    this.actRoute.params.subscribe((data: any)=>{
      console.log(data);
      this.donation_id = data.donation_id;
    
      if(this.donation_id!=0){
        this.users = [];
        this.loaddonors();
        
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


  async doRefresh(event){
    const loader = await this.loadCtrl.create({
      message: 'Please wait....',
    });
    

      this.ngOnInit();    
      event.target.complete();
      loader.dismiss();
  }


  async approved(a) {
    const alert = await this.alertController.create({
      
      header: "Alert",
      message: "Do you really want to accept this donation?",
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
                aksi: 'updatestatus',
                donation_id: this.donation_id,
                statusofdonate: this.statusofdonate,
                
                action: a
                
              }
              
               this.accsPrvdrs.postData(body, 'proses_api.php').subscribe((res:any)=>{
                  if(res.success==true){
                   alert.dismiss();
                    this.disabledButton = false;
                    this.presentToast(a+res.msg);
                   //this.router.navigate(['approvedpage']);
                    this.sendsms();
                   
                  }else {
                    alert.dismiss();
                    this.disabledButton = false;
                    this.presentAlert(res.msg,a);
                  }
                },(err) =>{
                  
                 alert.dismiss();
                 this.disabledButton = false;
                 this.presentToast('Updated Successfully, refresh to view');
                 this.router.navigate(['/listofpantry']);
               });
             
            });
          
          },
        },
      ],
     
    });
  
    await alert.present();
  }

 /* async approved(a){
    this.disabledButton = true;
      const loader = await this.loadCtrl.create({
        message: 'Please wait....',
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'updatestatus',
          donation_id: this.donation_id,
          statusofdonate: this.statusofdonate,
          
          action: a
          
        }
        
         this.accsPrvdrs.postData(body, 'proses_api.php').subscribe((res:any)=>{
            if(res.success==true){
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(a+res.msg);
             
            }else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentAlert(res.msg,a);
            }
          },(err) =>{
            
           loader.dismiss();
           this.disabledButton = false;
           this.presentToast('Updated Successfully, refresh to view');
           this.router.navigate(['/listofpantry']);
         });
       
      });
    
  }*/

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message : a,
      duration : 1500,
      position : 'top'
    });
    toast.present();
  }


  async presentAlert(a,b){
    const alert = await this.AlertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Close',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            //action
          }
        }, {
          text: 'Try again',
          handler:()=>{
            this.approved(b);
          }
        }
      ]
    });
  
    await alert.present();
  }

  async sendsms(){

    const load = await this.loadCtrl.create({
      message : "Loading....",
     });
    
    
    return new Promise(resolve => {
      let data = {
        aksi: 'send', 
        donation_id: this.donation_id,
        user_contact: this.user_contact
           
      }
  
      this.accsPrvdrs.postData(data, 'approvedmessage.php').subscribe((res:any)=>{
  
    }) 
    });
  
    
  }

  sendmessage(a){
    this.router.navigate(['/sendmessageowner/' +a]);
  }

  
}