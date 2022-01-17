import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IonTabs } from '@ionic/angular';
import { AccessProviders } from '../../providers/access.providers';


@Component({
  selector: 'app-donorhome',
  templateUrl: './donorhome.page.html',
  styleUrls: ['./donorhome.page.scss'],
})
export class DonorhomePage implements OnInit {

 
  buttonValue = 'profile';
  buttonItems: any[];


  complete: any;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvdrs: AccessProviders,
    private storage: Storage,
    private navCtrl: NavController
  ) { }

  datastorage: any;

  fname: string;
  mname: string;
  lname: string;
  u_name: string;
  u_email: string;
  u_number: string;
  user_id: number;
  users = []
  mydonation = []
  pantry: any = [];
  donation_id: number;
 

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.storage.get('storage_xxx').then((res) => {
      console.log(res);
      this.datastorage = res;
      this.user_id = this.datastorage.user_id;
      this.users = [];
      this.loadUser();
      this.mydonation=[];
      this.load_donations();
      
     
    });
  }

  buttonsChanged(event) {
    console.log(event.detail.value);
    this.buttonValue = event.detail.value;
  }

  async loadUser(){
    const load = await this.loadCtrl.create({
      message : "Loading....",
     });
    
    
    return new Promise(resolve => {
      let data = {
        aksi: 'load_profile',
        user_id: this.user_id,
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

  async load_donations(){
    const load = await this.loadCtrl.create({
      message : "Loading....",
     });
    
    
    return new Promise(resolve => {
      let data = {
        aksi: 'donorbadge',
        user_id: this.user_id,
      
      }

      this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
        if(res.success==true){
          for(let datas of res.result){
            this.mydonation.push(datas);
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

  updatedonorprofile(a){
    this.router.navigate(['updatedonorprofile/' + a]);
  }

  async doRefresh(event){
    const loader = await this.loadCtrl.create({
      message: 'Please wait....',
    });
    

      this.ionViewDidEnter();
      event.target.complete();

      loader.dismiss();
  }

  donorhistory(){
    this.router.navigateByUrl('donationhistory');
  }


}