import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router,  } from '@angular/router';

import { AlertController, LoadingController, ToastController, NavController, ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AccessProviders } from '../providers/access.providers';

import { ApiService, community_pantry } from 'src/app/api.service';

@Component({
  selector: 'app-donationhistory',
  templateUrl: './donationhistory.page.html',
  styleUrls: ['./donationhistory.page.scss'],
})
export class DonationhistoryPage implements OnInit {

  constructor(
    private route: Router,
    private http: HttpClient,
    private alertController: AlertController,
    public loadCtrl: LoadingController,
    public AlertCtrl: AlertController,
    private navCtrl: NavController,
    private actionCtrl: ActionSheetController,
    private storage: Storage,
    private router: Router, 
    private actRoute: ActivatedRoute,
    public apiService: ApiService,
    private toastCtrl: ToastController,
    private accsPrvdrs: AccessProviders
  ) { }

  users = []
  pending = []
  pantry: any = [];
  totalaccepted=[]
  totalpending =[]

  pantry_id: number;
  address: string;
  email: string;
  phone_number: string;
  date_of_donation: string;
  transaction: string;
  user_id: number;
  pantry_name: string;
  datastorage: any;
  donation_id : number;
  segmentValue= '1';
 
  disabledButton;

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.storage.get('storage_xxx').then((res) => {
      console.log(res);
      this.datastorage = res;
      this.user_id = this.datastorage.user_id;
      this.users = [];
      this.pending = [];
       this.loadUser();
       this.loadpending();
       this.totalaccepted=[];
       this.totalpending =[];
       this.totalpendingdonations();
       this.totalaccepteddonations();
    });

  }

    async loadUser(){
      const load = await this.loadCtrl.create({
        message : "Loading....",
       });
      
      
      return new Promise(resolve => {
        let data = {
          aksi: 'load_donationhistory',
          user_id: this.user_id,
          pantry_id: this.pantry_id,
          donation_id: this.donation_id,
        }

        this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
          if(res.success==true){
            for(let datas of res.result){
              this.users.push(datas);
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


    async loadpending(){
      const load = await this.loadCtrl.create({
        message : "Loading....",
       });
      
      
      return new Promise(resolve => {
        let data = {
          aksi: 'load_pendingdonations',
          user_id: this.user_id,
          pantry_id: this.pantry_id,
        }

        this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
          if(res.success==true){
            for(let datas of res.result){
              this.pending.push(datas);
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

    async presentToast(a){
      const toast = await this.toastCtrl.create({
        message : a,
        duration : 1500,
        position : 'top'
      });
      toast.present();
    }

    async doRefresh(event){
      const loader = await this.loadCtrl.create({
        message: 'Please wait....',
      });
        loader.present();
        this.ionViewDidEnter();
        event.target.complete();
        loader.dismiss();
    }

    segmentChanged(event){
      console.log(event);
      this.segmentValue = event.detail.value;
    }

    async delData(a) {
      this.disabledButton = true;
      const alert = await this.alertController.create({
        
        header: "Alert",
        message: "Are you sure that you want to CANCEL this donation?",
        buttons: [
          {
            text: "Close",
            role: "cancel",
            handler: () => {
              console.log("No");
             
            },
          },
          {
            text: "Confirm",
            handler: () => {
              console.log("Yes"); 
            
             
        return new Promise(resolve => {
          let body = {
            aksi: 'del_users',
            donation_id: a
          }
          this.accsPrvdrs.postData(body, 'proses_api.php').subscribe((res:any)=>{
            if(res.success==true){
              this.presentToast('You successfully cancel your donation');
              this.ionViewDidEnter();
            }else{
              this.presentToast('Cancel error');
            }
          });
        });  
  
            
            },
            
          },
        ],
       
      });
    
      await alert.present();
     
    }


    totalpendingdonations(){
      return new Promise(resolve => {
        let body = {
          aksi: 'total_pending',
          user_id: this.user_id,
        }
     
        this.accsPrvdrs.postData(body, 'proses_api.php').subscribe((res:any)=>{
          if(res.success==true){
            for(let datas of res.result){
              this.totalpending.push(datas);
            }
          }else{
          }
      },(err)=>{
         
        }) 
      });
     }

     totalaccepteddonations(){
      return new Promise(resolve => {
        let body = {
          aksi: 'total_accepted',
          user_id: this.user_id,
        }
     
        this.accsPrvdrs.postData(body, 'proses_api.php').subscribe((res:any)=>{
          if(res.success==true){
            for(let datas of res.result){
              this.totalaccepted.push(datas);
            }
          }else{
          }
      },(err)=>{
         
        }) 
      });
     }

}