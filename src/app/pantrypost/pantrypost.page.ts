import { Component, OnInit  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListofimagesPage } from '../listofimages/listofimages.page';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { PantryService } from 'src/app/services/pantry.service';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../providers/access.providers';
import { CategoriesPage } from '../categories/categories.page';
import { TopdonorsPage } from '../topdonors/topdonors.page';




import { RecommendationService, recommendation } from 'src/app/services/recommendation.service';

@Component({
  selector: 'app-pantrypost',
  templateUrl: './pantrypost.page.html',
  styleUrls: ['./pantrypost.page.scss'],
})
export class PantrypostPage {

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
  public recommendation=[];
  user_id: number;
  users = []
  recommends = []

  datastorage: any;

  sliderOpts = {
    zoom:false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 20
  };

  
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res) => {
      console.log(res);
      this.datastorage = res;
      this.users = [];
      this.recommends = [];
       this.loadUser();
       this.recommend();
    });
  //  this.pantry_id;
  }



  constructor(private service: PantryService, private accsPrvdrs: AccessProviders, 
    private storage: Storage,  private router:Router, private loadingCtrl: LoadingController,
    private modalCtrl: ModalController, public recommendationService: RecommendationService,
    private toastCtrl: ToastController) {}

  ngOnInit() {
    
      
      
     
     
  }

  
  async doRefresh(event){
    const loader = await this.loadingCtrl.create({
      message: 'Please wait....',
    });
    

      this.ngOnInit();
      event.target.complete();

      loader.dismiss();
  }

  async loadUser(){
    const load = await this.loadingCtrl.create({
      message : "Loading....",
     });
    
    
    return new Promise(resolve => {
      let data = {
        aksi: 'load_communitypantry',
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

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message : a,
      duration : 1500,
      position : 'top'
    });
    toast.present();
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

 
  async openTransparentModal(){
    const modal = await this.modalCtrl.create({
      component: CategoriesPage,
      cssClass: 'transparent-modal'
    });
    await modal.present();
  }




  openPantry(a){
    this.router.navigate(['/pantrydetails/' +a]);
  }

  categories(){
    this.router.navigateByUrl('/categories');
  }

  async openTransparentModalDonors(){
    const modal = await this.modalCtrl.create({
      component: TopdonorsPage,
      cssClass: 'transparent-modal'
    });
    await modal.present();
  }

}

