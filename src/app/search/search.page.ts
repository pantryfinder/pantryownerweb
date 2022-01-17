import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListofimagesPage } from '../listofimages/listofimages.page';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { PantryService, community_pantry } from 'src/app/services/pantry.service';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../providers/access.providers';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  term;
  pantry: community_pantry[];
  pantry_id: number;
  pantry_name: string;
  phone_number: string;
  list_of_items: string;
  street_address: string;
  barangay: string;
  municipality: string;
  province: string;
  region: string;
  email: string;
  gcash_number: string;
  category: string;
  status: string;
  user_id: number;
  users = []
  cat1 = []
  cat2 = []
  cat3 = []

  datastorage: any;

  segmentValue= '1';
  

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      console.log(res);
      this.datastorage = res;
      this.users = [];
       this.loadUser();
      
      
    });
    this.pantry_id;
  //  this.loadPantry();
  }
  
  constructor(private service: PantryService, 
    private accsPrvdrs: AccessProviders, private storage: Storage, 
     private router:Router, private loadingCtrl: LoadingController,
     private actRoute: ActivatedRoute,
     private modalController: ModalController, private toastCtrl: ToastController) { }

  ngOnInit() {
   
    this.storage.get('storage_xxx').then((res)=>{
      console.log(res);
      this.datastorage = res;
        this.cat1 =[];
        this.category1();
        this.cat2=[];
        this.category2();
        this.cat3=[];
        this.category3();
      
    });
  }

  async loadUser(){
    const load = await this.loadingCtrl.create({
      message : "Loading....",
     });
    
    
    return new Promise(resolve => {
      let data = {
        aksi: 'search_communitypantry',
        user_id: this.user_id,
        pantry_id: this.pantry_id,
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

  async category1(){
    const load = await this.loadingCtrl.create({
      message : "Loading....",
     });
    
    
    return new Promise(resolve => {
      let data = {
        aksi: 'search_category1',
        user_id: this.user_id,
        pantry_id: this.pantry_id,
      }

      this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
        if(res.success==true){
          for(let datas of res.result){
            this.cat1.push(datas);
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

  async category2(){
    const load = await this.loadingCtrl.create({
      message : "Loading....",
     });
    
    
    return new Promise(resolve => {
      let data = {
        aksi: 'search_category2',
        user_id: this.user_id,
        pantry_id: this.pantry_id,
      }

      this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
        if(res.success==true){
          for(let datas of res.result){
            this.cat2.push(datas);
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

  async category3(){
    const load = await this.loadingCtrl.create({
      message : "Loading....",
     });
    
    
    return new Promise(resolve => {
      let data = {
        aksi: 'search_category3',
        user_id: this.user_id,
        pantry_id: this.pantry_id,
      }

      this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
        if(res.success==true){
          for(let datas of res.result){
            this.cat3.push(datas);
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

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message : a,
      duration : 1500,
      position : 'top'
    });
    toast.present();
  }


  openPantry(a){
    this.router.navigate(['/pantrydetails/' +a]);
  }
  
  async doRefresh(event){
    const loader = await this.loadingCtrl.create({
      message: 'Please wait....',
    });
    

      this.ngOnInit();
      event.target.complete();

      loader.dismiss();
  }

  segmentChanged(event){
    console.log(event);
    this.segmentValue = event.detail.value;
  }

}
