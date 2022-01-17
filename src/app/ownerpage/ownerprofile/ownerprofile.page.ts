
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access.providers';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-ownerprofile',
  templateUrl: './ownerprofile.page.html',
  styleUrls: ['./ownerprofile.page.scss'],
})
export class OwnerprofilePage implements OnInit {

  
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

  segmentValue= '1';

  datastorage: any;
  tpantries=[]
  fname: string;
  mname: string;
  lname: string;
  u_name: string;
  u_email: string;
  u_number: string;
  user_id: number;
  users = []
  user = []
  pantry: any = [];
 
  
 
  ngOnInit() {

  }

  ionViewDidEnter() {
    this.storage.get('storage_xxx').then((res) => {
      console.log(res);
      this.datastorage = res;
      this.user_id = this.datastorage.user_id;
      this.users = [];
       this.loadUser();
       this.user = [];
       this.loadUser1();
       this.tpantries =[];
       this.totalpantries();
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

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message : a,
      duration : 1500,
      position : 'top'
    });
    toast.present();
  }

  openCrud(a){
    this.router.navigate(['update/' + a]);
  }

  async doRefresh(event){
    const loader = await this.loadCtrl.create({
      message: 'Please wait....',
    });
    

      this.ngOnInit();
      this.ionViewDidEnter();
      event.target.complete();

      loader.dismiss();
  }

  segmentChanged(event){
    console.log(event);
    this.segmentValue = event.detail.value;
  }


  async loadUser1(){
    const load = await this.loadCtrl.create({
      message : "Loading....",
     });
    
    
    return new Promise(resolve => {
      let data = {
        aksi: 'load_profile1',
        user_id: this.user_id,
      }

      this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
        if(res.success==true){
          for(let datas of res.result){
            this.user.push(datas);
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



  async totalpantries(){
    const load = await this.loadCtrl.create({
      message : "Loading....",
     });
    
    
    return new Promise(resolve => {
      let data = {
        aksi: 'totalpantries',
        user_id: this.user_id,
      }

      this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
        if(res.success==true){
          for(let datas of res.result){
            this.tpantries.push(datas);
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
