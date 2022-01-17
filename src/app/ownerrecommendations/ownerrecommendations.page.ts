import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { PantryService, community_pantry } from 'src/app/services/pantry.service';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../providers/access.providers';

@Component({
  selector: 'app-ownerrecommendations',
  templateUrl: './ownerrecommendations.page.html',
  styleUrls: ['./ownerrecommendations.page.scss'],
})
export class OwnerrecommendationsPage implements OnInit {

  pantry: any = [];
  pantry_id: number;
  pantry_name: string;
  user_contact: string;
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
  open_time: string;
  close_time: string;
  public recommendation=[];
  user_id: number;
  users = []
  recommends = []

  datastorage: any;

  constructor(private modalCtrl: ModalController, private service: PantryService, private accsPrvdrs: AccessProviders, 
    private storage: Storage,  private router:Router, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res) => {
      console.log(res);
      this.datastorage = res;
      this.recommends = [];
       this.recommend();
    });
  }

  async recommend(){
    const load = await this.loadingCtrl.create({
      message : "Loading....",
     });
    
    
    return new Promise(resolve => {
      let data = {
        aksi: 'load_recommend',
      
      }

      this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
        if(res.success==true){
          for(let datas of res.result){
            this.recommends.push(datas);
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

  next(){
   // this.router.navigate(['pantrypost']);
    this.modalCtrl.dismiss();
  }

  donate(){
    //this.router.navigate(['login']);
    this.modalCtrl.dismiss();
  }
  openPantry(a){
    this.router.navigate(['/donorpantrydetails/' +a]);
    this.modalCtrl.dismiss();
  }


}
