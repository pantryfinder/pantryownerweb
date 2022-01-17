import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { PantryService, community_pantry } from 'src/app/services/pantry.service';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../providers/access.providers';

@Component({
  selector: 'app-topdonors',
  templateUrl: './topdonors.page.html',
  styleUrls: ['./topdonors.page.scss'],
})
export class TopdonorsPage implements OnInit {

  donation_id: number;
  user_id: number;
  user_fname: string;
  user_lname: string;
  user_email: string;
  topdonors = []
  datastorage: any;
  pantry_id: number;
  toppings: any;

  public form = [
    { val: 'Foods', isChecked: false },
    { val: 'Clothes', isChecked: false },
    { val: 'Medicine', isChecked: false }
  ];
  constructor(private modalCtrl: ModalController, private service: PantryService, 
    private accsPrvdrs: AccessProviders, 
    private storage: Storage,  private router:Router, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
      
     }

    ngOnInit() {
    }
  
    ionViewDidEnter(){
      this.storage.get('storage_xxx').then((res) => {
        console.log(res);
        this.datastorage = res;
        this.topdonors = [];
        this.loadtopdonors();
      });
    }
  
    async loadtopdonors(){
      const load = await this.loadingCtrl.create({
        message : "Loading....",
       });
      
      
      return new Promise(resolve => {
        let data = {
          aksi: 'load_topdonors',
        }
  
        this.accsPrvdrs.postData(data, 'proses_api.php').subscribe((res:any)=>{
          if(res.success==true){
            for(let datas of res.result){
              this.topdonors.push(datas);
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
  
  }